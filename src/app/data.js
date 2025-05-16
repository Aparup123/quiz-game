import feature1 from "../../public/assets/feature1.svg"
import feature2 from "../../public/assets/feature2.svg"
import feature3 from "../../public/assets/feature3.svg"
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
const features=[
    {   
        image:feature1,
        alt:"feature1 image",
        title:"Choose Your Quiz Topic",
        content:"Start by selecting a topic you're interested in! Whether it's science, history, technology, or pop culture, our quiz game lets you explore and test your knowledge in the subject you love."
    },
    {   
        image:feature2,
        alt:"feature2 image",
        title:"AI-Generated Questions",
        content:"Experience dynamic and intelligent quizzes! Our AI generates relevant and challenging questions based on your selected topic, ensuring a fresh and engaging quiz every time."
    },
    {   
        image:feature3,
        alt:"feature3 image",
        title:"Instant Score Evaluation",
        content:"Done with the quiz? Instantly receive your score based on your answers and the marks you set. The system evaluates everything in real-time for quick feedback."
    }
]

const footerLinks=[
    {
        title:"Contact us",
        links:"#"
    },
    {
        title:"About",
        links:"#"
    },
    {
        title:"How to play",
        links:"#"
    },
    {
        title:"FAQs",
        links:"#"
    },
    {
        title:"Support",
        links:"#"
    },
]

const footerHandles=[
    {
        title:"facebook",
        icon:<FaFacebook/>,
        link:"#",
    },
    {
        title:"twitter",
        icon:<FaTwitter/>,
        link:"#",
    },
    {
        title:"instagram",
        icon:<FaInstagram/>,
        link:"#",
    },
    {
        title:"youtube",
        icon:<FaYoutube/>,
        link:"#",
    }

]

const footerCompanyLinks=[
    {
        title:"Terms",
        link:"#",
    },
    {
        title:"Privacy",
        link:"#",
    },
    {
        title:"Cookies",
        link:"#",
    },
    {
        title:"Developers",
        link:"#",
    },
]

export {features, footerHandles, footerLinks, footerCompanyLinks}