import AuthorsRating from './authors-rating';

export default function AuthorsProfile({ name, slug, rating }: { name: string, slug: string, rating: number }) {
  return (
    <div>
      <div>
        <h1 className='text-[32px] text-dark-300 dark:text-white font-poppins font-semibold'>
          { name }
        </h1>
      </div>
      <div className='flex items-center'>
        <div className='text-[16px] font-poppins font-normal'>
          @{ slug }
        </div>
        <div>
          <AuthorsRating rating={rating} />
        </div>
      </div>
    </div>
  )
}