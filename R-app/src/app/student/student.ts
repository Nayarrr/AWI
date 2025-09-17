export class Student{

    constructor(
        public id : number,
        public firstname : string,
        public name : string,
        public filiere : string,
        public promo : number,
        public date : Date,
    ){}

    get isFinalYear():boolean{
        return this.promo === 5
    }

}
