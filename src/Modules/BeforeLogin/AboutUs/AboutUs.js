import { Box, Typography } from "@mui/material";
import ResponsiveContainer from "../../../Components/ResponsiveContainer/ResponsiveContainer";
import "./AboutUs.css";

const AboutUs = () => {
    return (
        <div className="AboutUsContainer">
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
            <ResponsiveContainer
                leftContent={
                    <Typography variant="h5" component="h5" gutterBottom sx={{ fontWeight: 500, lineHeight: { xs: '1.8rem', md: '2.4rem' }, fontSize: { xs: '1rem', md: '1.4rem' } }}>
                        Welcome to
                        <Box component="span" sx={{ color: 'primary.main', marginLeft: "4px" }}>Lost and Found Hub</Box>
                        , where we believe in the power of community to reunite lost items with their rightful owners. Our platform serves as a central hub for individuals to report found items and search for their lost belongings. At
                        <Box component="span" sx={{ color: 'primary.main', marginLeft: "4px" }}>Lost and Found Hub</Box>
                        , we're dedicated to helping you find what's rightfully yours.
                    </Typography>
                }
                rightContent={
                    <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                        <Box
                            component="img"
                            src="images/AboutUs1.png"
                            alt="Illustration of a person returning a lost item"
                            sx={{
                                maxWidth: '100%',
                                height: 'auto',
                                width: { xs: '80%', md: '100%' },
                            }}
                        />
                    </Box>
                }
            />
            <ResponsiveContainer
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
                            src="images/AboutUs2.png"
                            alt="Illustration of a person returning a lost item"
                            sx={{
                                maxWidth: '100%',
                                height: 'auto',
                                width: { xs: '80%', md: '100%' },
                            }}
                        />
                    </Box>
                }
            />
        </div>
    );
};

export default AboutUs;