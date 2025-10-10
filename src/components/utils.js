import {
  LinkedinOutlined,
  GithubOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

export const experience = [
      {
        id: 1,
        title: "Information Technology Intern",
        company: "DCI Resources",
        duration: "January 2019 - May 2019",
        applications: "Workforce Training & Job Placement",
        description: `I worked at an organization focused on training and placing low-income individuals in unsubsidized jobs. 
        My role involved coaching employees, supporting system and security implementations, managing network and backup solutions, 
        and collaborating with teams to design client-focused interfaces.`    
    },
    {
        id: 2,
        title: "Software Engineer",
        company: "ChainYard",
        duration: "January 2020 - April 2022",
        applications: "Trust Your Supplier",
        description: `I designed and developed the Trust Your Supplier web application, a supplier–buyer model on a blockchain network.
         I built reusable UI services for secure API communication, developed features using React Hooks and Carbon components, 
         automated form generation with JSON loaders, and created MongoDB migration scripts. I also tested CRUD operations and APIs, 
         contributing to reliable performance and scalability.`
    },
    {
        id: 3,
        title: "Software Engineer",
        company: "Cisco Systems",
        duration: "April 2022 - Present",
        applications: "Cisco Applications (CHAIN, COP, CPA, MOrE)",
        description: `At Cisco, I contributed to multiple enterprise-scale applications. I developed React-based UIs for CHAIN, 
        enabling incident correlation, analytics, and visualization with ML-driven monitoring. I enhanced CPA to highlight high-risk 
        change requests for predictive analysis and contributed to COP by building AIOps solutions and data ingestion pipelines. 
        Currently, I’m developing MOrE (Monitoring Orchestration Experience), focusing on onboarding and managing monitoring services 
        using the MERN stack, SQL, and integrations with platforms like Splunk logging, Observability Cloud, Zabbix, and ThousandEyes.`
    },  
];

export const skills = [
    'C', 'C++', 'Java', 'Python', 'JavaScript (ES6)', 'React (Hooks, DevTools)', 'Redux',
    'HTML5', 'CSS3', 'SASS', 'Bootstrap', 'jQuery', 'Carbon React', 'XML',
    'Node.js', 'Express.js', 'PHP', 'JSP', 'Django', 'RESTful APIs', 'Microservices',
    'MVC Architecture', 'MongoDB', 'MySQL', 'SQLite', 'Elastic DB', 'DBeaver',
    'CI/CD', 'Docker', 'Kubernetes', 'Kafka', 'Graylog', 'Swagger', 'Splunk', 'Zabbix',
    'Jest', 'Postman', 'Insomnia', 'JSONata', 'Bcrypt', 'JWT', 'Git', 'Agile/Scrum', 'Adobe Photoshop'
];

export const contact = [
    {
        id: 1,
        name: 'LinkedIn',
        icon: <LinkedinOutlined />,
        url: 'https://www.linkedin.com/in/sahithipoladi/'
    },
    {
        id: 2,
        name: 'GitHub',
        icon: <GithubOutlined />,
        url: 'https://github.com/SahithiPoladi'
    },
    {
        id: 3,
        name: 'Instagram',
        icon: <InstagramOutlined />,
        url: 'https://www.instagram.com/sahiatelier'
    }
]