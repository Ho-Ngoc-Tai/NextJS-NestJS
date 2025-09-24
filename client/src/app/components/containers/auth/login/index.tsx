"use client";

import { useEffect, useState } from "react";
import {
    Box,
    Card,
    Tabs,
    Tab,
    TextField,
    Button,
    Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { loginRequest, makeAuth } from "@/app/stores/reducers/authSlice";
// import { makeSelectAuthError, makeSelectAuthLoading, makeSelectAuthUser } from "@/app/stores/reducers/authSlice";

export default function LoginPage() {
    const [tab, setTab] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const loading = useSelector(makeSelectAuthLoading);
    // const error = useSelector(makeSelectAuthError);
    // const user = useSelector(makeSelectAuthUser);
    const login = useSelector(makeAuth)
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogin = () => {
        dispatch(loginRequest({ email, password }));
    }

    useEffect(() => {
        if (login?.user) {
            router.push("/dashboard");
        }
    }, [login?.user]);

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            sx={{ backgroundColor: "background.default" }}
        >
            <Card
                sx={{
                    width: 420,
                    p: 4,
                    borderRadius: 4,
                    backgroundColor: "background.paper",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                }}
            >
                <Tabs
                    value={tab}
                    onChange={(_, v) => setTab(v)}
                    variant="fullWidth"
                    sx={{ mb: 3 }}
                >
                    <Tab label="Log In" />
                    <Tab label="Sign Up" />
                </Tabs>

                {/* Login */}
                {tab === 0 && (
                    <Box display="flex" flexDirection="column" gap={2}>
                        <Typography variant="h4" textAlign="center" mb={2}>
                            Log In
                        </Typography>
                        <TextField label="Email" type="email" fullWidth onChange={(e) => setEmail(e.target.value)} />
                        <TextField label="Password" type="password" fullWidth onChange={(e) => setPassword(e.target.value)} />
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ mt: 2 }}
                            onClick={handleLogin}
                            disabled={login.loading}   // khi đang login thì disable nút
                        >
                            {login.loading ? "Logging in..." : "Submit"}
                        </Button>

                        {login.error && (
                            <Typography color="error" mt={2} textAlign="center">
                                {login.error}
                            </Typography>
                        )}
                        <Typography variant="body2" textAlign="center" mt={2}>
                            <a href="#" style={{ color: "#ffeba7" }}>
                                Forgot your password?
                            </a>
                        </Typography>
                    </Box>
                )}


                {/* Signup */}
                {tab === 1 && (
                    <Box display="flex" flexDirection="column" gap={2}>
                        <Typography variant="h4" textAlign="center" mb={2}>
                            Sign Up
                        </Typography>
                        <TextField label="Full Name" type="text" fullWidth />
                        <TextField label="Email" type="email" fullWidth />
                        <TextField label="Password" type="password" fullWidth />
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ mt: 2 }}
                            // onClick={handleRegister}
                            disabled={login.loading}   // khi đang login thì disable nút
                        >
                            {login.loading ? "Logging in..." : "Submit"}
                        </Button>

                        {login.error && (
                            <Typography color="error" mt={2} textAlign="center">
                                {login.error}
                            </Typography>
                        )}
                    </Box>
                )}
            </Card>
        </Box>
    );
}
