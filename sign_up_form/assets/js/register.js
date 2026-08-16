export default class RegisterData{
    constructor({firstName, lastName, email, phone, password, confirmPassword}){
        this.firstName = firstName ?? "";
        this.lastName = lastName ?? "";
        this.email = email ?? "";
        this.phone = phone ?? "";
        this.password = password ?? "";
        this.confirmPassword = confirmPassword ?? "";
    }

    validate(){
        return this.password === this.confirmPassword;
    }
}