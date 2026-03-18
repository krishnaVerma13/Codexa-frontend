
export interface EmailSignup {
    name: string,
    role: string,
    email: string,
    password: string,
    authType: string,
};

export interface SignupError{
     name?: string,
    role?: string,
    email?: string,
    password?: string,
    authType?: string,
}

export interface EmailLogin {
    email: string,
    password: string,
    authType: string,
};

export interface LoginError{
    email?: string,
    password?: string,
}

export interface GithubSignup {};

export interface User {
    _id: string,
    name: string;
    email?: string;
    password?: string;
    role: string;
    githubId?: string;
    githubUsername?: string;
    githubAccessToken?: string;
    isSubscribed: boolean;
    trialUsed: Number;
    trialLimit: Number;
    authType: string;
    createdAt: Date;
    updatedAt: Date;
}