import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const getUsers = async (_, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ message: 'Users fetched successfully', users });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const register = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) return res.status(400).json({ message: 'Password tidak sesuai!' });

        const userExist = await User.find((user) => user.email === email);

        if (userExist) return res.status(400).json({ message: 'Email sudah terdaftar!' });

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        User.create({ name, email, password: hashPassword }, (err, user) => {
            return err
                ? res.status(400).json({ message: 'Gagal registrasi, silahkan coba kembali' })
                : res.status(201).json({ message: 'Registrasi berhasil, silahkan login', user });
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: 'User tidak terdaftar, silahkan register!' });

        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) return res.status(400).json({ message: 'Password salah!' });

        const accessToken = createAccessToken({
            id: user._id,
            name: user.name,
            email
        });

        const refreshToken = createRefreshToken({
            id: user._id,
            name: user.name,
            email
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24
        });

        user.refreshToken = refreshToken;
        await user.save();

        return res.status(200).json({ accessToken });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) return res.status(400).json({ message: 'User belum login!' });

        const user = await User.findOne({ refreshToken });

        if (!user) return res.status(400).json({ message: 'User belum login!' });

        user.refreshToken = null;
        await user.save();

        res.clearCookie('refreshToken');
        return res.status(200).json({ message: 'Berhasil logout, sampai jumpa :D' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const generateAccessToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) return res.status(401).json({ message: 'User belum login' });

        const user = await User.findOne({ refreshToken });

        if (!user) return res.status(401).json({ message: 'User belum login' });

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
            if (err) return res.sendStatus(403);
            const { email, name, id } = user;
            const accessToken = createAccessToken({ email, name, id });
            return res.status(200).json({ accessToken });
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createAccessToken = (payload) => jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60m' });

const createRefreshToken = (payload) => jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

export default { getUsers, register, login, logout, generateAccessToken };
