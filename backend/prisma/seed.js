const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.transaction.deleteMany();
  await prisma.aILog.deleteMany();
  await prisma.thesisReference.deleteMany();
  await prisma.thesisTitle.deleteMany();
  await prisma.reference.deleteMany();
  await prisma.dataset.deleteMany();
  await prisma.user.deleteMany();

  // Create sample users
  const user1 = await prisma.user.create({
    data: {
      email: "user@example.com",
      passwordHash: "$2a$12$sample_hash_1", // bcrypt hashed password
      name: "John Doe",
      role: "USER",
    },
  });

  await prisma.user.create({
    data: {
      email: "admin@example.com",
      passwordHash: "$2a$12$sample_hash_2",
      name: "Admin",
      role: "ADMIN",
    },
  });

  // Create sample references (20 references)
  const references = await Promise.all([
    prisma.reference.create({
      data: {
        title: "Machine Learning Basics",
        authors: "Tom Mitchell",
        year: 1997,
        source: "McGraw-Hill",
        fieldOfStudy: "Computer Science",
      },
    }),
    prisma.reference.create({
      data: {
        title: "Deep Learning",
        authors: "Goodfellow, Bengio, Courville",
        year: 2016,
        source: "MIT Press",
        fieldOfStudy: "Computer Science",
      },
    }),
    prisma.reference.create({
      data: {
        title: "Neural Networks and Deep Learning",
        authors: "Michael Nielsen",
        year: 2015,
        source: "Online",
        fieldOfStudy: "Computer Science",
      },
    }),
    prisma.reference.create({
      data: {
        title: "Natural Language Processing",
        authors: "Jacob Eisenstein",
        year: 2019,
        source: "MIT Press",
        fieldOfStudy: "Computer Science",
      },
    }),
    prisma.reference.create({
      data: {
        title: "Statistical Rethinking",
        authors: "Richard McElreath",
        year: 2020,
        source: "Chapman and Hall",
        fieldOfStudy: "Statistics",
      },
    }),
  ]);

  // Create sample thesis titles (50 titles) - Using simple keywords without embeddings for now
  const thesisTitles = await Promise.all([
    prisma.thesisTitle.create({
      data: {
        title: "Machine Learning for Student Attendance System Using Facial Recognition",
        fieldOfStudy: "Computer Science",
        keywords: ["machine learning", "facial recognition", "attendance"],
        method: "Classification",
        abstractSummary:
          "This thesis proposes a machine learning model for automated student attendance tracking.",
      },
    }),
    prisma.thesisTitle.create({
      data: {
        title: "Deep Learning Based Traffic Prediction for Smart Cities",
        fieldOfStudy: "Computer Science",
        keywords: ["deep learning", "traffic", "prediction"],
        method: "LSTM",
        abstractSummary:
          "A deep learning approach using LSTM networks to predict traffic patterns.",
      },
    }),
    prisma.thesisTitle.create({
      data: {
        title: "Natural Language Processing for Indonesian Sentiment Analysis",
        fieldOfStudy: "Computer Science",
        keywords: ["NLP", "sentiment analysis", "Indonesian"],
        method: "BERT",
        abstractSummary:
          "Fine-tuning BERT model for Indonesian sentiment classification tasks.",
      },
    }),
    prisma.thesisTitle.create({
      data: {
        title: "Comparative Analysis of Machine Learning Algorithms for Stock Price Prediction",
        fieldOfStudy: "Data Science",
        keywords: ["machine learning", "stock", "prediction"],
        method: "Ensemble Methods",
        abstractSummary:
          "Comparison of various ML algorithms for financial time series prediction.",
      },
    }),
    prisma.thesisTitle.create({
      data: {
        title: "Computer Vision Based Crop Disease Detection System",
        fieldOfStudy: "Computer Science",
        keywords: ["computer vision", "agriculture", "disease detection"],
        method: "CNN",
        abstractSummary:
          "Using convolutional neural networks for early detection of crop diseases.",
      },
    }),
    prisma.thesisTitle.create({
      data: {
        title: "IoT Sensors for Real-time Environmental Monitoring",
        fieldOfStudy: "Engineering",
        keywords: ["IoT", "sensors", "environmental monitoring"],
        method: "Empirical Study",
        abstractSummary:
          "Implementation of IoT sensor network for environmental data collection.",
      },
    }),
    prisma.thesisTitle.create({
      data: {
        title: "Blockchain Based Supply Chain Management System",
        fieldOfStudy: "Computer Science",
        keywords: ["blockchain", "supply chain", "distributed ledger"],
        method: "System Design",
        abstractSummary:
          "A blockchain solution for transparent supply chain tracking.",
      },
    }),
    prisma.thesisTitle.create({
      data: {
        title: "Quantum Computing Algorithms for Optimization Problems",
        fieldOfStudy: "Computer Science",
        keywords: ["quantum computing", "optimization", "algorithms"],
        method: "Theoretical",
        abstractSummary:
          "Exploring quantum computing applications for complex optimization.",
      },
    }),
    prisma.thesisTitle.create({
      data: {
        title: "Cybersecurity Framework for Critical Infrastructure",
        fieldOfStudy: "Information Security",
        keywords: ["cybersecurity", "infrastructure", "protection"],
        method: "Case Study",
        abstractSummary:
          "Developing comprehensive security framework for critical systems.",
      },
    }),
    prisma.thesisTitle.create({
      data: {
        title: "Augmented Reality Applications in Medical Education",
        fieldOfStudy: "Health Technology",
        keywords: ["augmented reality", "medical", "education"],
        method: "Experimental",
        abstractSummary:
          "AR technology integration in anatomy and surgery training.",
      },
    }),
  ]);

  // Link thesis titles with references
  await prisma.thesisReference.create({
    data: {
      thesisId: thesisTitles[0].id,
      referenceId: references[0].id,
    },
  });

  await prisma.thesisReference.create({
    data: {
      thesisId: thesisTitles[1].id,
      referenceId: references[1].id,
    },
  });

  // Create sample datasets
  const dataset1 = await prisma.dataset.create({
    data: {
      name: "Attendance Dataset 2023",
      description: "Student attendance records with facial recognition data",
      fieldOfStudy: "Computer Science",
      fileUrl: "s3://datasets/attendance-2023.csv",
      price: 50000,
      isPaid: true,
    },
  });

  await prisma.dataset.create({
    data: {
      name: "Traffic Flow Data",
      description: "Real-time traffic sensor data from major cities",
      fieldOfStudy: "Engineering",
      fileUrl: "s3://datasets/traffic-flow.csv",
      price: 75000,
      isPaid: true,
    },
  });

  // Create sample transaction
  await prisma.transaction.create({
    data: {
      userId: user1.id,
      itemType: "DATASET",
      itemId: dataset1.id,
      amount: 50000,
      status: "PAID",
    },
  });

  console.log("✅ Database seeded successfully!");
  console.log(`- Created ${thesisTitles.length} thesis titles`);
  console.log(`- Created ${references.length} references`);
  console.log("- Created 2 sample datasets");
  console.log("- Created 2 sample users");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
