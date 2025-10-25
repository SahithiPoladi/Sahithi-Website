import blog from './common/images/blog.png';
import cracs from './common/images/cracs.png';
import farmer from './common/images/farmer.png';
import port from './common/images/port.png';
import ruby from './common/images/ruby.png';
import star from './common/images/star.png';
import unh from './common/images/unh.png';
import sales from './common/images/sales.png';
import crimes from './common/images/crimes.png';
import pt from './common/images/pt.png';

export const aboutMe = [
    {
        "_id": "1",
        "data": [
            {
                "id": 1,
                "points": "Passionate software engineer with over 5 years of experience specializing in the MERN stack, while continuously exploring new technologies. <br />I enjoy being challenged — when given a new feature, I dive deep into the domain knowledge to understand the purpose before implementing it. <br />Known as a problem solver, attentive listener, and an extroverted introvert who enjoys organizing events and collaborating with teams."
            },
            {
                "id": 2,
                "points": "Enthusiastic traveler and nature lover — I enjoy hiking, exploring scenic trails, kayaking, and fishing. My friends and I are on a mission to visit every national park in the U.S. <br /> Big music fan who loves attending live concerts and discovering new artists."
            },
            {
                "id": 3,
                "points": "Passionate about home design and woodworking, always adding personal touches and character to my living space."
            },
            {
                "id": 4,
                "points": "Creative by nature — I paint portraits, abstracts, landscapes, and textured pieces, and share them on Instagram as a visual journal of my art journey."
            }
        ]
    }
];

export const contactMe = [
    {
        "_id": "1",
        "name": "LinkedIn",
        "icon": "LinkedinOutlined",
        "url": "https://www.linkedin.com/in/sahithipoladi/"
    },
    {
        "_id": "2",
        "name": "GitHub",
        "icon": "GithubOutlined",
        "url": "https://github.com/SahithiPoladi"
    },
    {
        "_id": "3",
        "name": "Instagram",
        "icon": "InstagramOutlined",
        "url": "https://www.instagram.com/sahiatelier"
    }
];

export const experiences = [
    {
        "_id": "1",
        "title": "Information Technology Intern",
        "company": "DCI Resources",
        "duration": "January 2019 - May 2019",
        "applications": "Workforce Training & Job Placement",
        "description": "I worked at an organization focused on training and placing low-income individuals in unsubsidized jobs. My role involved coaching employees, supporting system and security implementations, managing network and backup solutions, and collaborating with teams to design client-focused interfaces."
    },
    {
        "_id": "2",
        "title": "Software Engineer",
        "company": "ChainYard",
        "duration": "January 2020 - April 2022",
        "applications": "Trust Your Supplier",
        "description": "I designed and developed the Trust Your Supplier web application, a supplier–buyer model on a blockchain network.I built reusable UI services for secure API communication, developed features using React Hooks and Carbon components, automated form generation with JSON loaders, and created MongoDB migration scripts. I also tested CRUD operations and APIs, contributing to reliable performance and scalability."
    },
    {
        "_id": "3",
        "title": "Software Engineer",
        "company": "Cisco Systems",
        "duration": "April 2022 - Present",
        "applications": "Cisco Applications (CHAIN, COP, CPA, MOrE)",
        "description": "At Cisco, I contributed to multiple enterprise-scale applications. I developed React-based UIs for CHAIN, enabling incident correlation, analytics, and visualization with ML-driven monitoring. I enhanced CPA to highlight high-risk change requests for predictive analysis and contributed to COP by building AIOps solutions and data ingestion pipelines. Currently, I’m developing MOrE (Monitoring Orchestration Experience), focusing on onboarding and managing monitoring services using the MERN stack, SQL, and integrations with platforms like Splunk logging, Observability Cloud, Zabbix, and ThousandEyes."
    }
];

export const projects = [
    {
        "_id": "1",
        "name": "Crime Prediction in Chicago 2001-Present",
        "description": "By taking Crimes in Chicago 2001 to Present dataset into consideration, performed data analysis and data visualization.",
        "tech": [
            "Python 3.5 with Spark",
            "tensorflow",
            "py4j",
            "plotly",
            "cufflinks"
        ],
        "link": "https://github.com/SahithiPoladi/Crimes-in-chicago---2001-to-Present",
        "logo": crimes
    },
    {
        "_id": "2",
        "name": "Black Friday Sales Prediction and Comparision",
        "description": "Predicted black Friday sales in cities based on Age, Gender and Price.",
        "tech": [
            "Python 3.5 with Spark",
            "tensorflow",
            "py4j",
            "pixiedust",
            "plotly",
            "cufflinks"
        ],
        "link": "https://github.com/SahithiPoladi/Black_Friday_Sales_Prediction",
        "logo": sales
    },
    {
        "_id": "3",
        "name": "Periodic Table",
        "description": "Designed a periodic table with information of each element by using mouse operations.",
        "tech": [
            "HTML",
            "CSS",
            "JavaScript"
        ],
        "link": "https://github.com/SahithiPoladi/Periodic-Table",
        "logo": pt
    },
    {
        "_id": "4",
        "name": "Developer Connector",
        "description": "Developed a portfolio website using MERN Stack with all personal and educational information included with social links.",
        "tech": [
            "Node.js",
            "MongoDB",
            "Express.js",
            "Reactjs",
            "HTML",
            "Bootstrap"
        ],
        "link": "https://github.com/SahithiPoladi/Portfolio_app",
        "logo": port
    },
    {
        "_id": "5",
        "name": "Star SocialApp",
        "description": "A social clone blog with multi-user interaction. Anyone can join the group which is created by a user and can post comments.",
        "tech": [
            "Python",
            "Django",
            "MySQL",
            "HTML",
            "CSS",
            "Bootstrap",
            "JavaScript"
        ],
        "link": "https://github.com/SahithiPoladi/SocialApp",
        "logo": star
    },
    {
        "_id": "6",
        "name": "UNH FEST",
        "description": "Designed a website where registered students can check the events which are being held by the university by using the MVC Architecture.",
        "tech": [
            "Java",
            "MySQL",
            "HTML",
            "JSP",
            "CSS"
        ],
        "link": "https://github.com/SahithiPoladi/UNH-FEST",
        "logo": unh
    },
    {
        "_id": "7",
        "name": "BLOG",
        "description": "Developed a basic blog where I as a Super User can write a post and can be commented by anyone.",
        "tech": [
            "Python",
            "Django",
            "MySQL",
            "HTML",
            "CSS",
            "Bootstrap"
        ],
        "link": "https://github.com/SahithiPoladi/Blog-Project",
        "logo": blog
    },
    {
        "_id": "8",
        "name": "eCultivation",
        "description": "Developed an application to help the farmers in yielding a good crop by seeking the advice of agricultural experts.",
        "tech": [
            "Java",
            "XML",
            "PHP",
            "Android",
            "000webhost"
        ],
        "link": "https://github.com/SahithiPoladi/eCultivation",
        "logo": farmer
    },
    {
        "_id": "9",
        "name": "CRACS",
        "description": "Designed a static website which shows the entire details of the conference which was held in our university in the year 2017.",
        "tech": [
            "HTML",
            "CSS",
            "jQuery"
        ],
        "link": "https://github.com/SahithiPoladi/CRACS",
        "logo": cracs
    },
    {
        "_id": "10",
        "name": "Rubyzest'16",
        "description": "Designed a website for our college techno-cultural fest which was held in the year 2016.",
        "tech": [
            "HTML",
            "CSS",
            "Bootstrap",
            "jQuery",
            "JavaScript"
        ],
        "link": "https://github.com/SahithiPoladi/RUBYZEST-16",
        "logo": ruby
    }
];

export const skills = [{
    "_id": "1",
    "skills": [
        "C",
        "C++",
        "Java",
        "Python",
        "JavaScript (ES6)",
        "React (Hooks, DevTools)",
        "Redux",
        "HTML5",
        "CSS3",
        "SASS",
        "Bootstrap",
        "jQuery",
        "Carbon React",
        "XML",
        "Node.js",
        "Express.js",
        "PHP",
        "JSP",
        "Django",
        "RESTful APIs",
        "Microservices",
        "MVC Architecture",
        "MongoDB",
        "MySQL",
        "SQLite",
        "Elastic DB",
        "DBeaver",
        "CI/CD",
        "Docker",
        "Kubernetes",
        "Kafka",
        "Graylog",
        "Swagger",
        "Splunk",
        "Zabbix",
        "Jest",
        "Postman",
        "Insomnia",
        "JSONata",
        "Bcrypt",
        "JWT",
        "Git",
        "Agile/Scrum",
        "Adobe Photoshop"
    ]
}]

