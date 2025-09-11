'use client'
import React from 'react'
import { Box, TextField, Button, Typography, Alert, CircularProgress } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { login } from '../../store/authSlice'

type FormData = { email: string; password: string }

export default function LoginForm() {
    const { register, handleSubmit } = useForm<FormData>()
    const dispatch = useAppDispatch()
    const { loading, error } = useAppSelector((s) => s.auth)

    const onSubmit = (data: FormData) => {
        dispatch(login(data))
    }

    return (
        <Box sx={{ maxWidth: 420, mx: 'auto', mt: 8, p: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Đăng nhập</Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField label="Email" fullWidth margin="normal" {...register('email', { required: true })} />
                <TextField label="Mật khẩu" type="password" fullWidth margin="normal" {...register('password', { required: true })} />
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={loading}>
                    {loading ? <CircularProgress size={20} /> : 'Đăng nhập'}
                </Button>
            </form>
        </Box>
    )
}
