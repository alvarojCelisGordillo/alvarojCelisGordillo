var app = new Vue({
    el: '#app',
    data: {
        account_balance: 500000,
        value_selection: 0,
        amount_to_withdraw:0,

        // waterbill data

        water_value_selection: 0,
        water_amount_consumed: 0,
        consumption_value: 0,
    },

    methods: {

        functionNotAvailable() {
            Swal.fire({
                icon: 'error',
                title: '¡Estamos en construcción!',
                text: '¡Esta opción aún no esta habilitada. Por favor vuelve más tarde!',
                footer: '<a href="">¿Porque tengo este problema?</a>'
              })
        },

       

        succesfulWithdrawal(){
            Swal.fire({
                icon: 'success',
                title: '¡Tu retiro ha sido realizado exitosamente!',
                text: `Tu nuevo saldo es de ${this.formatNumber(this.account_balance)}`,
                footer: '<a href="">¡Gracias por elegirnos!</a>'
              })
        },

        unsuccesfulWithdrawal(){
            Swal.fire({
                icon: 'error',
                title: '¡Lo sentimos, no tienes fondos suficientes!',
                text: '¡Por favor realiza un deposito de tu cuenta para realizar pagos y obtener más beneficios!',
                footer: '<a href="">¡Gracias por elegirnos!</a>'
              })
        },

        invalidAmount(){
            Swal.fire({
                icon: 'error',
                title: '¡Lo sentimos, no has seleccionado un monto valido!',
                text: '¡Por favor intentalo de nuevo!',
                footer: '<a href="">¡Gracias por elegirnos!</a>'
              })
        },

        balanceCheck(){
            Swal.fire({
                icon: 'info',
                title: '¡Felicidades!, ¡Tu dinero está en el mejor lugar!',
                text: `Tu saldo actual es de ${this.formatNumber(this.account_balance)}`,
                footer: '<a href="">¡Gracias por elegirnos!</a>'
              })
        },

        printWaterBill_1(){
            Swal.fire({
                icon: 'success',
                title: `Tu Factura es de un total de ${this.formatNumber(this.consumption_value)}`,
                text: 'Se te aplicara un subsidio del 40% sobre tu cargo fijo de $2300',
                footer: '<a href="">¡Gracias por elegirnos!</a>'
              })
        },

        printWaterBill_2(){
            Swal.fire({
                icon: 'success',
                title: `Tu Factura es de un total de ${this.formatNumber(this.consumption_value)}`,
                text: 'Se te aplicara un subsidio del 30% sobre tu cargo fijo de $3200',
                footer: '<a href="">¡Gracias por elegirnos!</a>'
              })
        },

        printWaterBill_3(){
            Swal.fire({
                icon: 'success',
                title: `Tu Factura es de un total de ${this.formatNumber(this.consumption_value)}`,
                text: 'Se te aplicara un subsidio del 10% sobre tu cargo fijo de $3900',
                footer: '<a href="">¡Gracias por elegirnos!</a>'
              })
        },



        checkBalance() {
            if(this.amount_to_withdraw < this.account_balance) {
                return true;
            } else {
                return false;
            }
        },

        assignAmountWithdrawal() {
            if (this.value_selection == 0) {
                return false;
            } else if (this.value_selection == 1) {
                this.amount_to_withdraw = 10000;
                return true;
            } else if (this.value_selection == 2) {
                this.amount_to_withdraw = 20000;
                return true;
            } else if (this.value_selection == 3) {
                this.amount_to_withdraw = 50000;
                return true;
            } else if ((this.value_selection == 4) && (this.amount_to_withdraw == 0)) {
                return false;
            } else if (this.value_selection == 4) {
                this.amount_to_withdraw = this.amount_to_withdraw;
                return true;
            }
        },

        withdrawMoney() {
            
            if(this.checkBalance() && this.assignAmountWithdrawal()) {
                this.account_balance -= this.amount_to_withdraw;
                this.succesfulWithdrawal();
            }  else if ((!this.assignAmountWithdrawal()) && (this.amount_to_withdraw == 0)) {
                this.invalidAmount();
            }  else {
                console.log("not posible");
                this.unsuccesfulWithdrawal();
            }
        },

        formatNumber(num) {
            if (!num || num == 'NaN') return '-';
            if (num == 'Infinity') return '&#x221e;';
            num = num.toString().replace(/\$|\,/g, '');
            if (isNaN(num))
                num = "0";
            sign = (num == (num = Math.abs(num)));
            num = Math.floor(num * 100 + 0.50000000001);
            cents = num % 100;
            num = Math.floor(num / 100).toString();
            if (cents < 10)
                cents = "0" + cents;
            for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
                num = num.substring(0, num.length - (4 * i + 3)) + '.' + num.substring(num.length - (4 * i + 3));
            return (((sign) ? '' : '-') + num + ',' + cents);

        },

        //    water bill methods

        payWaterBill(){
            this.calculateBill();
        },
        
        calculateBill() {
            if (this.water_value_selection == 1) {
                this.consumption_value = (this.water_amount_consumed * 250) + (2300 - (2300*0.4));
                this.printWaterBill_1();
            } else if (this.water_value_selection == 2) {
                this.consumption_value = (this.water_amount_consumed * 350) + (3200 - (2300*0.3));
                this.printWaterBill_2();
            } else if (this.water_value_selection == 3) {
                this.consumption_value = (this.water_amount_consumed * 460) + + (3900 - (2300*0.1));
                this.printWaterBill_3();
            }
        }

    },
  })