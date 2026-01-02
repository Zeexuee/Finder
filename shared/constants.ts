// Field of study options
export const FIELD_OF_STUDY = [
  "Computer Science",
  "Information Systems",
  "Information Technology",
  "Software Engineering",
  "Data Science",
  "Artificial Intelligence",
  "Network & Security",
  "Business",
  "Engineering",
  "Education",
  "Health",
  "Social Science",
  "Other",
];

// Research method options
export const RESEARCH_METHODS = [
  "Naive Bayes",
  "SVM (Support Vector Machine)",
  "Linear Regression",
  "Decision Tree",
  "Random Forest",
  "Neural Network",
  "Deep Learning",
  "NLP",
  "Computer Vision",
  "Reinforcement Learning",
  "Clustering",
  "Time Series Analysis",
  "Case Study",
  "Survey",
];

// Common keywords for rule-based recommendations
export const KEYWORD_METHOD_MAPPING: Record<string, string[]> = {
  klasifikasi: ["Naive Bayes", "SVM", "Random Forest", "Neural Network"],
  prediksi: ["Linear Regression", "ARIMA", "LSTM", "Neural Network"],
  segmentasi: ["Clustering", "K-Means", "DBSCAN"],
  deteksi: ["Convolutional Neural Network", "YOLO", "SVM"],
  nlp: ["NLP", "BERT", "GPT", "Transformer"],
  gambar: ["Computer Vision", "Convolutional Neural Network", "Image Processing"],
};

// Default pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;
