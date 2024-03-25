export const setUserId = (id: string) => {
    localStorage.setItem('user_id', id);
};

export const getUserId = (): string | null => {
    return localStorage.getItem('user_id');
};

export const removeUserId = () => {
    localStorage.removeItem('user_id');
};
