import ProfileRating from './profile-rating';

export default function ProfileInfo({
  name,
  slug,
  rating,
}: {
  name: string;
  slug: string;
  rating: number;
}) {
  return (
    <div className="text-center lg:text-left">
      <div>
        <h1 className="text-[22px] lg:text-[32px] text-dark-300 dark:text-white font-poppins font-semibold">
          {name}
        </h1>
      </div>
      <div className="flex items-center mt-[5px] lg:mt-0">
        <div className="text-[12px] lg:text-[16px] font-poppins font-normal flex-1">
          @{slug}
        </div>
        <div className="hidden lg:block">
          <ProfileRating rating={rating} />
        </div>
      </div>
    </div>
  );
}
