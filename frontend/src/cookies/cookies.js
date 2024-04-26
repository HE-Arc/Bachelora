import { Cookies } from "quasar";

export default class Cookie {
    static cookieUser = "user";
    static cookieToken = "token";
    static cookieOptions = {
        expires: 1,
        path: '/',
        secure: true,
    };
    static create(user, token)
    {
        Cookies.set(this.cookieUser, user, this.cookieOptions);
        Cookies.set(this.cookieToken, token, this.cookieOptions);
    }

    static hasUserCookie()
    {
        return Cookies.has(this.cookieUser);
    }

    static hasTokenCookie()
    {
        return Cookies.has(this.cookieToken);
    }

    static getToken()
    {
        return Cookies.get(this.cookieToken);
    }

    static getUser()
    {
        return Cookies.get(this.cookieUser);
    }

    static delete()
    {
        if (this.hasUserCookie() && this.hasTokenCookie())
        {
            Cookies.remove(this.cookieUser, { path: "/"});
            Cookies.remove(this.cookieToken, { path: "/"});
            return true
        }
        else
        {
            return false;
        }
    }
}