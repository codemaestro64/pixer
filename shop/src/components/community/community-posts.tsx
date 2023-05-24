import Image from '@/components/ui/image';
import postImage from '@/assets/images/trending-product.png';

export default function CommunityPosts() {
  return (
    <div className='relative h-[272px] rounded-[10px] overflow-hidden'>
      <Image src={postImage} alt='Post' layout='fill' objectFit='cover' />
    </div>
  )
}