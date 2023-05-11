import { Tag } from "@/types";

function ProductTag({ name }: { name: string }) {
  return (
    <div className='px-[20px] py-[11px] xl:px-[32.2px] xl:py-[17.17px] border border-[#ececec] dark:border-dark-850 rounded-[66px] whitespace-nowrap'>
      <span className='text-[11.98px] xl:text-[19.32px] text-dark-850 font-semibold'>{name}</span>
    </div>
  )
}

export default function ProductTags({ tags }: { tags: Tag[]}) {
  return (
    <div className='overflow-hidden'>
      <div className='flex xl:flex-wrap gap-[8.68px] xl:gap-[14px] px-[13px] xl:px-0 overflow-auto scrollbar-hide'>
        {tags.map(({ id, name }) => (
          <ProductTag key={id} name={name} />
        ))}
      </div>
    </div>
  )
}