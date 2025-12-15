import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import ResponsiveContainer from "../../../Components/ResponsiveContainer/ResponsiveContainer";
import { motion } from 'framer-motion';
import "./AboutUs.css";
import SendIcon from '@mui/icons-material/Send';

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

const listItemVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

const AboutUs = () => {
    return (
        <div className="AboutUsContainer">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInUp}
            >
                <Typography
                    className="AboutUsTitle"
                    variant="h5"
                    component="h5"
                    sx={{
                        color: 'primary.main',
                        fontWeight: 500,
                        fontSize: { xs: '1rem', md: '1.6rem' }
                    }}>
                    About Us
                </Typography>
            </motion.div>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInUp}
            >
                <ResponsiveContainer
                    className="AboutUsHero"
                    leftContent={
                        <Typography variant="h5" component="h5" gutterBottom sx={{ fontWeight: 500, lineHeight: { xs: '1.8rem', md: '2.4rem' }, fontSize: { xs: '1rem', md: '1.4rem' } }}>
                            Welcome to
                            <Box component="span" sx={{ color: 'primary.main', marginLeft: "4px" }}>Lost and Found Hub</Box>
                            ❤️ - where strangers become heroes and lost items find their way home! We've built more than a platform; we've created a movement of caring people who believe that every lost item has a story worth reuniting. Join us in making the world a little bit kinder, one found item at a time.
                        </Typography>
                    }
                    rightContent={
                        <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                            <Box
                                component="img"
                                src="images/AboutUs1.webp"
                                alt="Illustration of a person returning a lost item"
                                loading="lazy"
                                sx={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    width: { xs: '80%', md: '100%' },
                                }}
                            />
                        </Box>
                    }
                />
            </motion.div>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInUp}
            >
                <ResponsiveContainer
                    className="OurStoryResponsive"
                    rightContent={
                        <div className="OurStoryContainer">
                            <div>
                                Our Story
                            </div>
                            <div>
                                Lost and Found Hub was founded with a simple mission: to make the process of finding lost items easier and more efficient. Inspired by personal experiences of losing cherished belongings, our founders set out to create a solution that leverages the strength of community collaboration.
                            </div>
                            <div>
                                Since our inception, Lost and Found Hub has grown into a thriving platform, thanks to the dedication of our team and the support of our community. Together, we've helped countless individuals reunite with their lost items, bringing joy and relief to those who thought their belongings were gone forever.
                            </div>
                        </div>
                    }
                    leftContent={
                        <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                            <Box
                                component="img"
                                src="images/AboutUs2.webp"
                                alt="Illustration of a person returning a lost item"
                                loading="lazy"
                                sx={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    width: { xs: '80%', md: '100%' },
                                }}
                            />
                        </Box>
                    }
                />
            </motion.div>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
            >
                <div className="AboutUsTeam">
                <motion.div variants={fadeInUp}>
                    <Typography
                        className="TeamTitle"
                        variant="h5"
                        component="h5"
                        sx={{
                            color: 'color.white',
                            fontWeight: 500,
                            fontSize: { xs: '1rem', md: '1.6rem' }
                        }}>
                        Meet the Team
                    </Typography>
                </motion.div>
                <motion.div variants={fadeInUp}>
                    <Typography
                        className="TeamSubTitle"
                        variant="h5"
                        component="h5"
                        sx={{
                            color: 'color.white',
                            fontWeight: 500,
                            fontSize: { xs: '1rem', md: '1.6rem' }
                        }}>
                        We're a small but mighty team driven by a big mission: reuniting people with what they've lost.
                        <br />Meet the people making it happen:
                    </Typography>
                </motion.div>
                <div className="AllMembers">
                    <motion.div 
                        className="EachMember" 
                        variants={fadeInUp}
                        style={{
                            fontSize: { xs: '1rem', md: '1.6rem' }
                        }}>
                        <div className="MemberImage">

                        </div>
                        <div className="NameDescription">
                            <Typography variant="h6" component="h6">A D V Ramana</Typography>
                            <Typography className="MemberDescription" variant="body2" component="p" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>Designer & Developer | Turning lost-and-found into an experience people love using</Typography>
                        </div>
                    </motion.div>
                    <motion.div className="EachMember" variants={fadeInUp}>
                        <div className="MemberImage">

                        </div>
                        <div className="NameDescription">
                            <Typography variant="h6" component="h6">A N S L Parameswari</Typography>
                            <Typography className="MemberDescription" variant="body2" component="p" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>Backend & DevOps Engineer | Building the technology that powers reunions</Typography>
                        </div>
                    </motion.div>
                </div>
            </div>
            </motion.div>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
            >
                <ResponsiveContainer
                    className="AboutUsInvolved"
                    leftContent={
                        <div className="GetInvolvedContainer">
                            <motion.div className="GetInvolvedTitle" variants={fadeInUp}>
                                Get Involved
                            </motion.div>
                            <motion.div className="GetInvolvedDescription" variants={fadeInUp}>
                                Join the Lost and Found Hub community today and be part of our mission to reunite lost items with their rightful owners. Here's how you can get involved:
                            </motion.div>
                            <div>
                                <List>
                                    <motion.div variants={listItemVariant}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <SendIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Report & Search - Found something? Lost something? Post it! Your 2-minute action could make someone's entire week."
                                            />
                                        </ListItem>
                                    </motion.div>
                                    <motion.div variants={listItemVariant}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <SendIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Connect & Share - Follow us on social media! Share posts, spread the word, and help reunions happen faster."
                                            />
                                        </ListItem>
                                    </motion.div>
                                    <motion.div variants={listItemVariant}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <SendIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Tell Your Story - Got reunited? Share your experience! Your success story inspires others and grows our community."
                                            />
                                        </ListItem>
                                    </motion.div>
                                </List>
                            </div>
                        </div>
                    }
                    rightContent={
                        <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                            <Box
                                component="img"
                                src="images/AboutUs3.webp"
                                alt="Illustration of a person returning a lost item"
                                loading="lazy"
                                sx={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    width: { xs: '80%', md: '100%' },
                                }}
                            />
                        </Box>
                    }
                />
            </motion.div>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInUp}
            >
                <ResponsiveContainer
                    className="AboutContactUs"
                    rightContent={
                        <div className="OurStoryContainer">
                            <div>
                                Contact Information
                            </div>
                            <div>
                                If you have any questions, feedback, or inquiries, we'd love to hear from you.
                            </div>
                            <div>
                                Feel free to reach out to us.
                            </div>
                        </div>
                    }
                    leftContent={
                        <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                            <Box
                                component="img"
                                src="images/AboutUs4.webp"
                                alt="Illustration of a person returning a lost item"
                                loading="lazy"
                                sx={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    width: { xs: '80%', md: '100%' },
                                }}
                            />
                        </Box>
                    }
                />
            </motion.div>
        </div>
    );
};

export default AboutUs;