import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Container, Card, CardContent, Box, IconButton, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountCircle from '@mui/icons-material/AccountCircle';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Home = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        let userId = localStorage.getItem("userId");
        console.log(userId);

        if (!userId) {
            navigate("/login");
        }
    }, []);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMyAccount = () => {
        handleMenuClose();
        navigate("/myAccount");
    };

    const handlePostedProjects = () => {
        handleMenuClose();
        navigate("/postedProjects");
    };

    const getAllProjects = () => {
        navigate("/getAllProjects");
    };

    const postProject = () => {
        navigate("/postProject");
    };

    const handleManageProjects = () => {
        navigate("/manageProjects");
    };

    const handleProjectsToComplete = () => {
        navigate("/projectsToWork");
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Freelancing Platform
                    </Typography>
                    <IconButton
                        color="inherit"
                        onClick={handleMenuOpen}
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem
                            onClick={handleMyAccount}
                            sx={{
                                "&:hover": {
                                    backgroundColor: "#f0f0f0",
                                    color: "#1976d2",
                                },
                            }}
                        >
                            My Account
                        </MenuItem>
                        <MenuItem
                            onClick={handlePostedProjects}
                            sx={{
                                "&:hover": {
                                    backgroundColor: "#f0f0f0",
                                    color: "#1976d2",
                                },
                            }}
                        >
                            Posted Projects
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Container style={{ marginTop: "20px" }}>
                <Typography variant="h3" align="center" gutterBottom>
                    Welcome to Freelancing Platform
                </Typography>
                <Typography variant="h6" align="center" paragraph>
                    Your one-stop solution for hiring freelancers and finding projects.
                </Typography>
                <Box display="flex" justifyContent="center" mb={4}>
                    <Button variant="contained" color="primary" size="large" style={{ margin: "0 10px" }}>
                        Hire a Freelancer
                    </Button>
                    <Button variant="contained" color="primary" size="large" style={{ margin: "0 10px" }} onClick={getAllProjects}>
                        Find a Project
                    </Button>
                </Box>
                <Box display="flex" justifyContent="space-around" flexWrap="wrap" mb={4}>
                    <Card style={{ width: "30%", margin: "10px", position: "relative" }}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Post a Project
                            </Typography>
                            <Typography variant="body2" component="p">
                                Describe your project and get proposals from freelancers.
                            </Typography>
                            <IconButton color="primary" style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={postProject}>
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </CardContent>
                    </Card>
                    <Card style={{ width: "30%", margin: "10px", position: "relative" }}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Browse Freelancers
                            </Typography>
                            <Typography variant="body2" component="p">
                                Find the perfect freelancer for your project.
                            </Typography>
                            <IconButton color="primary" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </CardContent>
                    </Card>
                    <Card style={{ width: "30%", margin: "10px", position: "relative" }}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Manage Projects
                            </Typography>
                            <Typography variant="body2" component="p">
                                Keep track of your projects.
                            </Typography>
                            <IconButton color="primary" style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={handleManageProjects}>
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </CardContent>
                    </Card>
                    <Card style={{ width: "30%", margin: "10px", position: "relative" }}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Projects to Complete
                            </Typography>
                            <Typography variant="body2" component="p">
                                View and complete your assigned projects.
                            </Typography>
                            <IconButton color="primary" style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={handleProjectsToComplete}>
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </CardContent>
                    </Card>
                </Box>
                <Box mt={5}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Why Choose Us?
                    </Typography>
                    <Box display="flex" justifyContent="space-around" flexWrap="wrap">
                        <Card style={{ width: "30%", margin: "10px" }}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Verified Freelancers
                                </Typography>
                                <Typography variant="body2" component="p">
                                    All freelancers are verified and vetted for quality.
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card style={{ width: "30%", margin: "10px" }}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Secure Payments
                                </Typography>
                                <Typography variant="body2" component="p">
                                    Secure and timely payments for all projects.
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card style={{ width: "30%", margin: "10px" }}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    24/7 Support
                                </Typography>
                                <Typography variant="body2" component="p">
                                    Our support team is available 24/7 to assist you.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Container>
            <footer style={{ padding: "20px", textAlign: "center", background: "#f1f1f1", marginTop: "40px" }}>
                <Typography variant="body2" color="textSecondary">
                    &copy; 2025 Freelancing Platform. All rights reserved.
                </Typography>
            </footer>
        </>
    );
};

export default Home;