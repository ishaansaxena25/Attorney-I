const tagKeywords = {
  Corporate: [
    "corporate",
    "company",
    "business",
    "merger",
    "shareholder",
    "corporate governance",
    "tax law",
    "business deductions",
    "trade law",
  ],
  Criminal: [
    "criminal",
    "crime",
    "fraud",
    "homicide",
    "theft",
    "arrest",
    "criminal justice",
    "sentencing",
    "plea bargain",
  ],
  International: [
    "international",
    "treaty",
    "bilateral",
    "foreign",
    "cross-border",
    "trade agreement",
  ],
  Privacy: ["privacy", "data protection", "HIPAA", "GDPR", "cybersecurity"],
};

function generateTags(title, description) {
  const text = `${title} ${description}`.toLowerCase();
  const tags = new Set();

  Object.entries(tagKeywords).forEach(([tag, keywords]) => {
    if (keywords.some((keyword) => text.includes(keyword.toLowerCase()))) {
      tags.add(tag);
    }
  });

  return Array.from(tags);
}

module.exports = { generateTags };
