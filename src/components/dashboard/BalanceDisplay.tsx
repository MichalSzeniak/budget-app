interface BalanceDisplayProps {
  balance: number;
}

const BalanceDisplay = ({ balance }: BalanceDisplayProps) => {
  return (
    <p className="absolute top-0 left-1/2 -translate-x-1/2 font-bold text-xl flex flex-col items-center">
      <span>Total</span>
      <span className={balance > 0 ? "text-green-500" : "text-red-400"}>
        {balance} zł
      </span>
    </p>
  );
};

export default BalanceDisplay;
