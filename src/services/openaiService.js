const OpenAI = require("openai");

class OpenAIService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.LEGAL_CATEGORIES = [
      "Corporate",
      "Criminal",
      "International",
      "Privacy",
      "Constitutional",
      "Environmental",
      "Human Rights",
      "Tax",
      "Labor",
    ];
  }

  async generateTags(title, description) {
    try {
      const prompt = `Analyze this legal news article and assign relevant legal categories from the following list: ${this.LEGAL_CATEGORIES.join(
        ", "
      )}

Article Title: ${title}
Article Description: ${description}

Return only the category names as a comma-separated list. Select only the most relevant categories (maximum 3).`;

      const completion = await this.openai.chat.completions.create({
        model: "gpt-4o", // Updated model name
        messages: [
          {
            role: "system",
            content:
              "You are a legal expert that categorizes news articles into legal categories. Respond only with category names, comma-separated.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 50,
        temperature: 0.3,
      });

      const response = completion.choices[0].message.content.trim();
      const tags = response.split(",").map((tag) => tag.trim());

      // Validate returned tags against our predefined categories
      const validTags = tags.filter((tag) =>
        this.LEGAL_CATEGORIES.includes(tag)
      );

      // Log for monitoring
      console.log(`Generated tags for article: "${title.substring(0, 30)}..."`);
      console.log("Valid tags:", validTags);

      return validTags;
    } catch (error) {
      console.error("OpenAI Service Error:", error);
      // Add fallback logic if API fails
      const titleLower = title.toLowerCase();
      const descLower = description.toLowerCase();

      // Simple keyword matching as fallback
      return this.LEGAL_CATEGORIES.filter(
        (category) =>
          titleLower.includes(category.toLowerCase()) ||
          descLower.includes(category.toLowerCase())
      ).slice(0, 3);
    }
  }
}

module.exports = new OpenAIService();
