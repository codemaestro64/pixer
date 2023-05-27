export default function ProfileSkills({ skills }: { skills: string }) {
  return !(skills === 'none' || skills === '') ? (
    <div className="py-[24px] px-[20px] bg-white dark:bg-[#292929] rounded-[20px]">
      <div className="text-[24px] text-dark-300 dark:text-white font-poppins font-semibold">
        Skills
      </div>
      <div className="mt-[24px] flex flex-wrap gap-[14px]">
        {skills.split(',').map((skill, index) => (
          <div
            key={index}
            className="px-[32.2px] py-[12px] text-[16px] text-[#787878] dark:text-[#989898] font-semibold border border-[#D2D2D2] dark:border-[#989898] rounded-[107.34px] whitespace-nowrap"
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div />
  );
}
