import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Link,
  CircularProgress,
  Divider,
  Avatar
} from "@mui/material";
import { useParams } from "react-router-dom";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { motion } from "framer-motion";
import { getUserDetails } from "../../api";

const ShowFreelancerProfile = () => {
  const { userId } = useParams(); 
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getUserDetails(userId);
        const data = res.data;
        if (!data) throw new Error("User not found");
        setUser(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [userId]);

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", mt: 4 }}>
          Profile
        </Typography>

        <Card elevation={4} sx={{ mt: 4, borderRadius: 3 }}>
          <CardContent>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box display="flex" alignItems="center" gap={1}>
                <Avatar><PersonIcon /></Avatar>
                <Typography><strong>Username:</strong> {user.username}</Typography>
              </Box>

              <Box display="flex" alignItems="center" gap={1}>
                <Avatar><EmailIcon /></Avatar>
                <Typography><strong>Email:</strong> {user.email}</Typography>
              </Box>

              <Box display="flex" alignItems="center" gap={1}>
                <Avatar><WalletIcon /></Avatar>
                <Typography><strong>Wallet:</strong> {user.walletAddress}</Typography>
              </Box>

              <Divider />

              <Typography variant="h6" sx={{ mt: 2 }}>Full Name:</Typography>
              <Typography>{user.fullName || "Not Provided"}</Typography>

              <Typography variant="h6">Bio:</Typography>
              <Typography>{user.bio || "Not Provided"}</Typography>

              <Typography variant="h6">LinkedIn:</Typography>
              {user.linkedin ? (
                <Link href={user.linkedin} target="_blank" rel="noopener" underline="hover">
                  <LinkedInIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                  {user.linkedin}
                </Link>
              ) : (
                <Typography variant="body2">Not Provided</Typography>
              )}

              <Typography variant="h6" sx={{ mt: 2 }}>Portfolio:</Typography>
              {user.portfolio ? (
                <Link href={user.portfolio} target="_blank" rel="noopener" underline="hover">
                  <LanguageIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                  {user.portfolio}
                </Link>
              ) : (
                <Typography variant="body2">Not Provided</Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
};

export default ShowFreelancerProfile;
