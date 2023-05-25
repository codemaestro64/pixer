import React, { useEffect } from 'react';

const ShowMoreLess = ({ content }: { content: string }) => {
  useEffect(() => {
    const elements = document.querySelectorAll('.paragraph');
    elements.forEach((element) => {
      if (element.scrollHeight > element.clientHeight) {
        const button = document.createElement('button');
        button.type = 'button';
        button.classList.add(
          'showMoreLess',
          'underline',
          'text-brand',
          'font-poppins',
          'text-[12px]',
          'md:text-[14px]',
          '2xl:text-[16px]'
        );
        button.textContent = 'Show more';
        element.parentNode?.insertBefore(button, element.nextSibling);
      }
    });
    const showMoreLessButtons = document.querySelectorAll('.showMoreLess');
    showMoreLessButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const paragraph = button.previousElementSibling;
        if (paragraph?.classList.contains('line-clamp-none')) {
          button.textContent = 'Show more';
          paragraph.classList.remove('line-clamp-none');
        } else {
          button.textContent = 'Show less';
          paragraph?.classList.add('line-clamp-none');
        }
      });
    });
  }, []);

  return (
    <p className="paragraph line-clamp-5 font-poppins text-[12px] text-[#3a3a3a] transition duration-300 dark:text-[#dedede] md:text-[14px] 2xl:text-[16px]">
      {content}
    </p>
  );
};

export default ShowMoreLess;
