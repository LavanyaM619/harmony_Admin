
import { useState, useEffect } from 'react';
import { Calculator, DollarSign, Clock, Coins } from 'lucide-react';

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState<number>(10000);
  const [loanTerm, setLoanTerm] = useState<number>(5);
  const [interestRate, setInterestRate] = useState<number>(5.5);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);

  // Calculate loan details
  useEffect(() => {
    const calculateLoan = () => {
      const principal = loanAmount;
      const monthlyRate = interestRate / 100 / 12;
      const numberOfPayments = loanTerm * 12;

      if (principal <= 0 || numberOfPayments <= 0 || monthlyRate <= 0) {
        setMonthlyPayment(0);
        setTotalPayment(0);
        return;
      }

      // Monthly payment formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
      const monthlyPaymentCalc = 
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      
      setMonthlyPayment(monthlyPaymentCalc);
      setTotalPayment(monthlyPaymentCalc * numberOfPayments);
    };

    calculateLoan();
  }, [loanAmount, loanTerm, interestRate]);

  // Intersection Observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const calculatorElement = document.getElementById('loan-calculator');
    if (calculatorElement) {
      observer.observe(calculatorElement);
    }

    return () => {
      if (calculatorElement) {
        observer.unobserve(calculatorElement);
      }
    };
  }, []);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <section 
      id="loan-calculator" 
      className="section bg-white relative overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-harmony-50 filter blur-3xl opacity-70"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-blue-50 filter blur-3xl opacity-70"></div>
      
      <div className="container-custom relative">
        <div className="text-center mb-12">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-harmony-100 text-harmony-800 inline-block mb-4">
            Financial Tools
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-gray-900 mb-4">
            Loan Calculator
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Plan your financial future with precision. Input your loan details below to see exactly what your repayments will be.
          </p>
        </div>
        
        <div 
          className={`max-w-4xl mx-auto transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Input Section */}
              <div className="p-6 md:p-8 bg-white">
                <div className="space-y-6">
                  {/* Loan Amount */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="loan-amount" className="block text-sm font-medium text-gray-700">
                        Loan Amount
                      </label>
                      <div className="flex items-center text-harmony-600">
                        <DollarSign size={14} className="mr-1" />
                        <span className="text-sm">{formatCurrency(loanAmount)}</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      id="loan-amount"
                      min="1000"
                      max="1000000"
                      step="1000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-harmony-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>$1,000</span>
                      <span>$1,000,000</span>
                    </div>
                  </div>
                  
                  {/* Loan Term */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="loan-term" className="block text-sm font-medium text-gray-700">
                        Loan Term (Years)
                      </label>
                      <div className="flex items-center text-harmony-600">
                        <Clock size={14} className="mr-1" />
                        <span className="text-sm">{loanTerm} {loanTerm === 1 ? 'year' : 'years'}</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      id="loan-term"
                      min="1"
                      max="30"
                      step="1"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-harmony-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1 year</span>
                      <span>30 years</span>
                    </div>
                  </div>
                  
                  {/* Interest Rate */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="interest-rate" className="block text-sm font-medium text-gray-700">
                        Interest Rate (%)
                      </label>
                      <div className="flex items-center text-harmony-600">
                        <Coins size={14} className="mr-1" />
                        <span className="text-sm">{interestRate}%</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      id="interest-rate"
                      min="0.1"
                      max="20"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-harmony-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0.1%</span>
                      <span>20%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Results Section */}
              <div className="p-6 md:p-8 bg-harmony-50 flex flex-col justify-center">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-harmony-100 flex items-center justify-center text-harmony-600">
                    <Calculator size={24} />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <ResultItem 
                    label="Monthly Payment" 
                    value={formatCurrency(monthlyPayment)} 
                    className="text-2xl md:text-3xl" 
                  />
                  
                  <div className="w-full h-px bg-harmony-200"></div>
                  
                  <ResultItem 
                    label="Total Payment" 
                    value={formatCurrency(totalPayment)} 
                  />
                  
                  <ResultItem 
                    label="Total Interest" 
                    value={formatCurrency(totalPayment - loanAmount)} 
                  />
                </div>
                
                <div className="mt-6 pt-6 border-t border-harmony-200">
                  <button 
                    className="w-full py-3 bg-harmony-600 text-white font-medium rounded-lg shadow-sm hover:bg-harmony-700 transition-colors duration-200 flex items-center justify-center"
                  >
                    Apply for This Loan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ResultItem = ({ label, value, className = "" }: { label: string, value: string, className?: string }) => (
  <div className="flex flex-col text-center">
    <span className="text-sm text-gray-600">{label}</span>
    <span className={`font-display font-semibold text-gray-900 ${className}`}>{value}</span>
  </div>
);

export default LoanCalculator;
