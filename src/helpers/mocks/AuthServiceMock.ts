export default class AuthServiceMock {
    isLoggingIn = false;
    isRecoveringPassword = false;
    response = new Promise(() => {});

    login() {
        this.isLoggingIn = true;
        return this.response;
    }
    recoverPassword(){
        this.isRecoveringPassword = true;
        return this.response;
    }
}