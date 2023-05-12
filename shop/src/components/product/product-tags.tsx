import { useTranslation } from 'next-i18next';
import AnchorLink from '@/components/ui/links/anchor-link';
import routes from '@/config/routes';
import { Tag } from '@/types';

type ProductTagsProps = {
  tags: Tag[];
};

const ProductTags: React.FC<ProductTagsProps> = ({ tags }) => {
  const { t } = useTranslation('common');

  return (
    <div className="overflow-hidden">
      {!!tags?.length && (
        <div className="scrollbar-hide flex gap-2 overflow-auto xl:flex-wrap">
          {tags.map((tag: Tag) => (
            <AnchorLink
              key={tag.id}
              href={routes.tagUrl(tag.slug)}
              className="items-center justify-center whitespace-nowrap rounded-full border border-light-600 px-4 py-2 font-medium text-light-base transition-all hover:bg-light-200 hover:text-dark-300 dark:border-dark-500 dark:text-light-600 dark:hover:bg-dark-400 hover:dark:text-light"
            >
              {tag.name}
            </AnchorLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductTags;
