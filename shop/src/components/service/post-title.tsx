export default function PostTitle({ title }: { title: string }) {
  return (
    <div className="p-[10px]">
      <h1 className="text-[18px] xl:text-[26px] text-dark-300 dark:text-white font-poppins font-medium">
        { title }
      </h1>
    </div>
  )
}