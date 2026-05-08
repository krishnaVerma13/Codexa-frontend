
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
    confpassword? : string
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
    tokenUsed: number;
    tokenLimit: number;
    authType: string;
    userProfile?: string;
    createdAt: Date;
    updatedAt: Date;
    resetLimiteAt?: Date;
    isLimitRiched?:boolean

}

export interface GithubRepoResponce {
    id: number;
    name: string;
    full_name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    language: string;
    created_at: string;
    updated_at: string;
}

export interface GithubFolderItem {
    download_url: string | null;
    git_url: string | null;
    html_url: string | null;
    name: string | null;
    path: string | null;
    sha: number| null;
    size: number | null;
    type: string | null;
    url: string | null;
    _links: string | null;
}

export interface TimeLine {
    name: string;
    path: string;
    fileType: string;
}