import Hero from "@/components/Hero/Hero";
import styles from "./page.module.css";
import MyTools from "@/components/MyTools/MyTools";

export default function Home() {
  return (
    <>
    <Hero/>
    {/* TECHNICAL PROFICIENCY */}
    <div className={styles.tech}>
      <div className={styles.techData}>
        <h3>Technical Proficiencies</h3>
        <ul>
          <li><div className={styles.techDataTitle}><span>01</span> <h4>NodeOps (Blockchain)</h4></div> <p>Deployment, management, and optimization of blockchain nodes to ensure high availability, security, and scalability in decentralized networks.</p></li>
          <li><div  className={styles.techDataTitle}><span>02</span> <h4>Infrastructure as Code (IAC)</h4></div> <p>Managing and provisioning computing infrastructure through machine-readable configuration files instead of manual processes.</p></li>
          <li><div  className={styles.techDataTitle}><span>03</span> <h4>CI/CD Pipelines</h4></div> <p>Automated processes that allow for the continuous integration, testing, and delivery of software changes to a production environment.</p></li>
          <li><div  className={styles.techDataTitle}><span>04</span> <h4>Containerization</h4></div> <p>Software development and deployment approach that involves packaging applications and their dependencies into containers.</p></li>
      
        </ul>
      </div>
      <div className={styles.techStats}>
        <ul>
          <li><span>15</span> <h4>PROJECTS COMPLETED</h4></li>
          <li><span>27</span> <h4>articles published</h4></li>
          <li><span>207</span> <h4>GITHUB CONTRIBUTIONS</h4></li>
        </ul>
      </div>
    </div>

    {/* TOOLS AND SOFFTARE */}
      <div>
        <MyTools/>
      </div>
    </>
  );
}
