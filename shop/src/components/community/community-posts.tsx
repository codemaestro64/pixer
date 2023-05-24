import Image from '@/components/ui/image';
import postImage from '@/assets/images/trending-product.png';

export default function CommunityPosts() {
  return (
    <div className='relative h-[272px] sm:h-[315.78px] 2xl:h-[440px] rounded-[10px] sm:rounded-[20.81px] 2xl:rounded-[29px] overflow-hidden'>
      <Image src={postImage} alt='Post' layout='fill' objectFit='cover' />
    </div>
  )
}