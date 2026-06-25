export const DEFAULT_SERVICES = [
  {
    id: "web-dev",
    slug: "web-development",
    title: "Web Development & Enterprise Apps",
    shortDesc: "We build high-performance web applications using React, Next.js, Node.js, Laravel, and WordPress. Our SEO-friendly architecture ensures maximum visibility.",
    description: `
      <h3>Architecting the Digital Future of Your Business</h3>
      <p>In today's digital-first landscape, a robust web presence is non-negotiable. Our enterprise web development services are engineered to deliver lightning-fast, highly scalable, and exceptionally secure applications. Utilizing a vast array of modern and proven stacks such as <strong>React, Next.js, Node.js, Express, Prisma, Python, PHP, Laravel, and WordPress</strong>, we build bespoke platforms tailored exactly to your business logic.</p>
      <br/>
      <h4>High-Performance E-Commerce & Portals</h4>
      <p>From custom WordPress CMS sites and complex Laravel platforms to high-traffic Next.js e-commerce ecosystems, our SEO-optimized architecture ensures that your application performs flawlessly under massive server load while dominating search engine rankings.</p>
      <br/>
      <h4>Seamless API Integrations</h4>
      <p>Modern applications do not live in isolation. We build and consume complex RESTful and GraphQL APIs using Node.js and Python to seamlessly integrate your custom software with third-party ecosystems like Salesforce, Stripe, AWS, and more.</p>
    `,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
    features: [{ title: "React, Next.js & Node" }, { title: "PHP & Laravel" }, { title: "WordPress & CMS" }, { title: "Python & Prisma" }, { title: "Enterprise Dashboards" }, { title: "API Development" }],
    approachSteps: [
      { title: "Architecture Design", desc: "Selecting the perfect stack (e.g., Next.js vs Laravel) based on your unique scaling needs." },
      { title: "Frontend Development", desc: "Crafting responsive interfaces using React, Vue, or modern template engines." },
      { title: "Backend Engineering", desc: "Building secure APIs and robust databases with Node.js, Python, or PHP." },
      { title: "Deployment & Scaling", desc: "Automated CI/CD pipelines ensuring zero-downtime deployments." }
    ],
    metaTitle: "Web Development | Next.js, Laravel, WordPress | PikoNox",
    metaDescription: "Expert web development using React, Next.js, PHP, Laravel, and WordPress. We build scalable, SEO-optimized enterprise applications.",
    metaKeywords: "web development, Next.js agency, React developers, Node.js backend, PHP, Laravel, WordPress, Python, Prisma, SEO web architecture"
  },
  {
    id: "mobile-dev",
    slug: "mobile-development",
    title: "Mobile App Development",
    shortDesc: "Deliver seamless mobile experiences across iOS and Android with our high-performance Flutter app development services. We focus on intuitive UI/UX.",
    description: `
      <h3>Transforming Ideas into Industry-Leading Mobile Experiences</h3>
      <p>Mobile-first is no longer the future; it is the present. We design and develop high-performance mobile applications that captivate users and drive engagement. To ensure rapid delivery without compromising on quality, we specialize in cross-platform development using <strong>Flutter</strong>, allowing us to deploy beautiful, natively-compiled applications for both iOS and Android from a single codebase.</p>
      <br/>
      <h4>Offline-First & Real-Time Sync</h4>
      <p>Our Flutter solutions are built with offline capabilities, real-time synchronization, and advanced security protocols to ensure your users have a flawless experience, anywhere in the world. Fluid animations and a 60fps rendering engine guarantee a premium feel.</p>
      <br/>
      <h4>Hardware & Sensor Integration</h4>
      <p>We push the boundaries of mobile technology by seamlessly integrating with native device hardware through custom Flutter channels. From Bluetooth Low Energy (BLE), GPS, and biometric authentication to advanced camera features, your app will interact deeply with the physical world.</p>
    `,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80",
    features: [{ title: "Flutter Cross-Platform" }, { title: "iOS & Android Apps" }, { title: "Fluid 60fps Animations" }, { title: "IoT Device Integration" }, { title: "App Store Optimization" }, { title: "Mobile UI/UX Design" }],
    approachSteps: [
      { title: "UX/UI Prototyping", desc: "Creating intuitive mobile interfaces tailored to Flutter's highly customizable widget system." },
      { title: "Agile Development", desc: "Iterative builds focusing on core features, fluid animations, and rapid performance." },
      { title: "Quality Assurance", desc: "Rigorous testing across multiple physical devices, OS versions, and network conditions." },
      { title: "Launch & ASO", desc: "Managing app store submissions, resolving review rejections, and optimizing visibility." }
    ],
    metaTitle: "Flutter Mobile App Development | iOS & Android | PikoNox",
    metaDescription: "Build high-performance cross-platform mobile apps using Flutter. Seamless UI/UX and robust mobile architectures for iOS and Android.",
    metaKeywords: "mobile app development, Flutter developers, cross-platform apps, iOS app developers, Android development, custom mobile solutions"
  },
  {
    id: "pos-systems",
    slug: "pos-systems",
    title: "Point of Sale (POS) Systems",
    shortDesc: "Streamline your retail or restaurant operations with our custom, cloud-based Point of Sale (POS) systems. Integrated inventory management and real-time analytics.",
    description: `
      <h3>Next-Generation Retail & Hospitality Management</h3>
      <p>Modernize your storefront with bespoke, cloud-powered Point of Sale (POS) systems. We develop custom POS software designed specifically for retail, hospitality, and enterprise environments. By migrating away from clunky legacy systems, you gain real-time visibility into your entire operation from any device, anywhere in the world.</p>
      <br/>
      <h4>Omnichannel Inventory & Analytics</h4>
      <p>Our POS solutions feature seamless <strong>inventory management, multi-location synchronization, employee tracking, and secure payment gateway integrations</strong>, empowering you to make data-driven decisions on the fly. Comprehensive dashboards provide insights into peak sales hours, top-performing staff, and inventory forecasting.</p>
      <br/>
      <h4>Secure & PCI Compliant Processing</h4>
      <p>Security is paramount when handling transactions. We integrate with leading payment processors to ensure end-to-end encryption. Our systems are built to be strictly PCI-DSS compliant, reducing your liability and protecting your customers' sensitive financial data.</p>
    `,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1200&q=80",
    features: [{ title: "Retail & Restaurant POS" }, { title: "Omnichannel Inventory" }, { title: "Hardware Integration" }, { title: "Payment Gateway Integration" }, { title: "Employee Management" }, { title: "Real-Time Analytics" }],
    approachSteps: [
      { title: "Workflow Analysis", desc: "Deeply understanding your daily operations to ensure the POS interface reduces checkout friction." },
      { title: "Software Customization", desc: "Tailoring the interface, tax logic, and feature set to your exact local and industry requirements." },
      { title: "Hardware & Payment Sync", desc: "Implementing highly secure, PCI-compliant payment processors and syncing with receipt printers." },
      { title: "Staff Training & Support", desc: "Providing comprehensive onboarding to ensure your team is fully equipped." }
    ],
    metaTitle: "Custom POS Systems & Software Development | PikoNox",
    metaDescription: "Cloud-based Point of Sale (POS) software development for retail and hospitality. Real-time inventory, secure payments, and custom analytics.",
    metaKeywords: "POS systems, custom point of sale software, retail POS development, restaurant POS, cloud inventory management, secure payment gateways"
  },
  {
    id: "ui-ux",
    slug: "ui-ux-design",
    title: "UI/UX Design & Branding",
    shortDesc: "Transform user interactions with stunning UI/UX design. Our creative team uses Figma and Adobe tools to craft visually compelling prototypes and digital branding.",
    description: `
      <h3>Designing Digital Experiences that Captivate and Convert</h3>
      <p>Great software is defined by how it makes the user feel. Our UI/UX design philosophy is rooted in human-centered principles, ensuring that every interface we create is not only visually stunning but intuitively functional. We utilize industry-standard software, primarily <strong>Figma</strong> for collaborative high-fidelity prototyping, along with the entire suite of <strong>Adobe Creative Cloud tools (Photoshop, Illustrator, After Effects)</strong> for rich asset creation and motion design.</p>
      <br/>
      <h4>Wireframing & High-Fidelity Prototyping in Figma</h4>
      <p>Before a single line of code is written, we craft detailed wireframes and interactive prototypes in Figma. This allows stakeholders to click through the application, test micro-interactions, and validate workflows. Figma's collaborative environment means you are always in the loop during the design phase.</p>
      <br/>
      <h4>Comprehensive Digital Branding</h4>
      <p>Beyond the interface, we establish cohesive digital brand identities using Adobe tools. From developing comprehensive design systems and typography scales to creating custom vector iconography sets, we ensure your brand speaks with a unified, premium voice across all digital touchpoints.</p>
    `,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&q=80",
    features: [{ title: "Figma Prototyping" }, { title: "Adobe Creative Cloud Assets" }, { title: "Visual Identity & Branding" }, { title: "Design Systems" }, { title: "Usability Testing" }, { title: "Motion & Interaction Design" }],
    approachSteps: [
      { title: "Discovery & Empathy", desc: "Understanding user personas, analyzing behavioral data, and defining the core problem." },
      { title: "Information Architecture", desc: "Mapping out the structural flow, navigation hierarchy, and user journey of the application." },
      { title: "Figma Prototyping", desc: "Applying visual brand elements, typography, and micro-interactions to create a clickable prototype." },
      { title: "User Testing & Handoff", desc: "Validating designs with real users and providing developer-ready specs for seamless implementation." }
    ],
    metaTitle: "UI/UX Design | Figma & Adobe Branding Agency | PikoNox",
    metaDescription: "Human-centered UI/UX design services using Figma and Adobe tools. We craft intuitive wireframes, stunning prototypes, and digital branding.",
    metaKeywords: "UI/UX design, Figma prototyping, Adobe Creative Cloud, user experience agency, user interface design, digital branding, wireframing"
  },
  {
    id: "cloud-devops",
    slug: "cloud-devops",
    title: "Cloud Infrastructure & DevOps",
    shortDesc: "Accelerate deployment and reduce downtime with our expert Cloud & DevOps services. We architect scalable infrastructure on AWS, Google Cloud, and Azure.",
    description: `
      <h3>Architecting the Backbone of Modern Enterprises</h3>
      <p>The foundation of any enterprise application is its infrastructure. Our DevOps engineers specialize in migrating, managing, and optimizing complex cloud architectures across <strong>Amazon Web Services (AWS), Google Cloud Platform (GCP), and Microsoft Azure</strong>. We ensure your platforms remain secure, highly available, and infinitely scalable.</p>
      <br/>
      <h4>Containerization & Serverless Computing</h4>
      <p>By implementing containerization with Docker and orchestration via Kubernetes, we decouple your applications from the underlying hardware, making deployments predictable and highly scalable. For event-driven workloads, we utilize Serverless architectures (AWS Lambda, Google Cloud Functions) to dramatically reduce operational overhead and lower hosting costs.</p>
      <br/>
      <h4>Automated CI/CD Pipelines</h4>
      <p>We eradicate the "it works on my machine" problem. Our engineers build robust Continuous Integration and Continuous Deployment (CI/CD) pipelines using GitHub Actions, GitLab CI, or Jenkins. This ensures that every code commit is automatically tested, built, and deployed to staging or production environments with zero downtime, accelerating your time-to-market.</p>
    `,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80",
    features: [{ title: "AWS / GCP / Azure Migration" }, { title: "CI/CD Pipeline Automation" }, { title: "Kubernetes & Docker" }, { title: "Serverless Architecture" }, { title: "Infrastructure as Code (IaC)" }, { title: "Cloud Cost Optimization" }],
    approachSteps: [
      { title: "Infrastructure Audit", desc: "Evaluating current setups for security vulnerabilities, bottlenecks, and cost inefficiencies." },
      { title: "Cloud Architecture Design", desc: "Designing a robust, fault-tolerant, and secure cloud-native environment using Terraform." },
      { title: "Pipeline Automation", desc: "Building CI/CD pipelines for automated testing, container registry pushes, and seamless deployments." },
      { title: "24/7 Observability", desc: "Implementing advanced telemetry, centralized logging, and alerting to prevent downtime before it happens." }
    ],
    metaTitle: "Cloud Infrastructure & DevOps Services | PikoNox",
    metaDescription: "Expert Cloud & DevOps consulting. AWS, GCP, Azure migration, Kubernetes, and automated CI/CD pipelines for highly scalable applications.",
    metaKeywords: "Cloud infrastructure, DevOps agency, AWS migration, Google Cloud deployment, Azure architecture, CI/CD pipelines, Kubernetes containerization, serverless"
  },
  {
    id: "ai-ml",
    slug: "ai-machine-learning",
    title: "AI & Machine Learning Solutions",
    shortDesc: "Harness the power of artificial intelligence to automate processes and gain predictive insights. From natural language processing to computer vision.",
    description: `
      <h3>Unlocking the Power of Proprietary Intelligence</h3>
      <p>Artificial Intelligence is redefining what is possible in software. We help enterprises integrate cutting-edge AI and Machine Learning models to unlock unprecedented operational efficiencies. Instead of relying on generic tools, we build proprietary, fine-tuned models that turn your raw data into a massive competitive advantage.</p>
      <br/>
      <h4>Natural Language Processing (NLP) & LLMs</h4>
      <p>From intelligent customer service chatbots to automated document summarization, we leverage state-of-the-art Large Language Models (LLMs) and NLP techniques to help machines understand, interpret, and generate human language. We build Retrieval-Augmented Generation (RAG) pipelines that allow AI to query your proprietary databases securely without hallucinating.</p>
      <br/>
      <h4>Predictive Analytics & Forecasting</h4>
      <p>Why react when you can predict? Our data scientists engineer complex algorithms that analyze historical data to identify hidden patterns. Whether it is predicting inventory shortages, forecasting financial market trends, or identifying customer churn before it happens, our predictive models empower proactive decision-making.</p>
    `,
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=1200&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80",
    features: [{ title: "Predictive Analytics" }, { title: "Custom LLMs & NLP" }, { title: "Computer Vision Systems" }, { title: "Data Engineering Pipelines" }, { title: "AI-Powered Chatbots" }, { title: "Process Automation" }],
    approachSteps: [
      { title: "Data Strategy & Cleansing", desc: "Identifying valuable data sources, establishing clean pipelines, and normalizing historical data." },
      { title: "Algorithm Selection & Training", desc: "Selecting the optimal neural network architecture and training custom models tailored to your specific goals." },
      { title: "Ecosystem Integration", desc: "Developing APIs to seamlessly embed AI capabilities into your existing web, mobile, or enterprise software." },
      { title: "Continuous Optimization", desc: "Monitoring model drift and continuously refining algorithms based on real-world feedback and new data inflows." }
    ],
    metaTitle: "AI & Machine Learning Solutions | PikoNox",
    metaDescription: "Custom Artificial Intelligence and Machine Learning development. We build predictive analytics, NLP algorithms, and intelligent automation systems.",
    metaKeywords: "Artificial Intelligence development, Machine Learning agency, predictive analytics, NLP chatbots, computer vision, data engineering, AI integration"
  }
];
