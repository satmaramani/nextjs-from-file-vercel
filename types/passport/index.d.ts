declare namespace passport {
    export interface User {
        id: string;
        displayName: string;
        email: string;
        imageUrl?: string;
    }
}
