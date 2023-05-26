interface TradePathsProps {
  paths: {
    path: string;
    active?: boolean;
  }[];
}

export default function TradePaths({ paths }: TradePathsProps) {
  return (
    <div>
      {paths.map(({ path, active }, index) => (
        <span key={index} className={`inline-block text-[18px] lg:text-[20px] 2xl:text-[22px] font-poppins leading-[1.68] whitespace-nowrap ${
          active ?
            'text-[#27B47F] dark:text-[#47ECAE] font-bold' :
            'text-[#767676aa] dark:text-[#767676] font-normal'
        }`}>
          { path } { paths.length - 1 === index ? '' : <>&gt;&nbsp;</> }
        </span>
      ))}
    </div>
  )
}