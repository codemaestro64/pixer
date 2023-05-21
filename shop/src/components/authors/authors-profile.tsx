import AuthorsRating from './authors-rating';

export default function AuthorsProfile({ name, slug, rating }: { name: string, slug: string, rating: number }) {
  return (
    <div className='text-center xl:text-left'>
      <div>
        <h1 className='text-[22px] xl:text-[32px] text-dark-300 dark:text-white font-poppins font-semibold'>
          { name }
        </h1>
      </div>
      <div className='flex items-center mt-[5px] xl:mt-0'>
        <div className='text-[12px] xl:text-[16px] font-poppins font-normal flex-1'>
          @{ slug }
        </div>
        <div className='hidden xl:block'>
          <AuthorsRating rating={rating} />
        </div>
      </div>
    </div>
  )
}