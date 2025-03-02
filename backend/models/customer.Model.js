import mongoose from "mongoose";

const loanRepaymentSchema = new mongoose.Schema({
    Date: { type: Date, required: true, default : new Date()},
    EMIReceived: { type: Number, required: true }
});

const customerSchema = new mongoose.Schema({
    financerId: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    openDate: { type: Date, required: true },
    closeDate: { type: Date, required: true },
    accountNo: { type: String, required: true },
    EMICount: { type: Number, default: 0 },
    EMIAmount: { type: Number, required: true },
    loanAmount: { type: Number, required: true },
    withInterest: { type: Number, required: true },
    balance: { type: Number, required: true },
    received: { type: Number, default: 0 },
    shouldReceive: { type: Number, default: 0 },
    pendingBalance: { type: Number, default: 0 },
    loanRepayment: [loanRepaymentSchema],
});

customerSchema.pre('save', function (next) {

    const openDate = new Date(this.openDate)
    openDate.setUTCHours(0, 0, 0, 0);
    const currentDate = new Date()
    currentDate.setUTCHours(0, 0, 0, 0);
    this.EMICount = (currentDate - openDate) / (1000 * 24 * 3600);

    this.shouldReceive = Math.min(this.EMICount * this.EMIAmount, this.withInterest);

    this.received = this.loanRepayment.reduce((total, emi) => total + emi.EMIReceived, 0);
    this.balance = this.withInterest - this.received;


    this.pendingBalance = this.received - this.shouldReceive;


    if (this.loanRepayment && this.loanRepayment.length > 0) {
        this.loanRepayment.sort((a, b) => {
            return new Date(a.Date) - new Date(b.Date);
        })
    }

    next();
});

const customerModal = mongoose.model('Customer', customerSchema);

export default customerModal;