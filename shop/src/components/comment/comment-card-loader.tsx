export default function CommentCardLoader() {
  return (
    <div className="max-w-full bg-light text-left dark:bg-dark-250 xs:w-[430px] sm:w-[550px] md:w-[600px] lg:w-[960px] xl:w-[1200px] 3xl:w-[1460px]">
      <div className="flex h-full flex-col pt-6 sm:pt-10 lg:pt-0">
        <div className="flex w-full flex-row items-center gap-2 border-t border-light-300 pt-4 pb-8 dark:border-dark-400 md:pt-5 md:pb-10">
          <div className="flex items-start">
            <span className="h-12 w-12 flex-shrink-0 animate-pulse rounded-full bg-light-400 dark:bg-dark-100/60" />
          </div>
          <div className="flex w-full flex-col items-start gap-7">
            <span className="h-3 w-full flex-shrink-0 animate-pulse bg-light-400 dark:bg-dark-100/60" />
            <span className="h-3 w-full animate-pulse bg-light-400 dark:bg-dark-100/60" />
          </div>
        </div>
        <div className="mt-auto flex flex-col-reverse items-center xs:gap-2.5 xs:pb-4 md:flex-nowrap md:gap-3.5 lg:gap-4 3xl:pb-14">
          <span className="h-12 w-full animate-pulse rounded bg-light-400 dark:bg-dark-100/60" />
          <span className="h-12 w-full animate-pulse rounded bg-light-400 dark:bg-dark-100/60" />
        </div>
      </div>
    </div>
  );
}
