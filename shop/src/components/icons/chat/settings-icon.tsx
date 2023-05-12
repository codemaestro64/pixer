export const SettingsIcon: React.FC<React.SVGAttributes<{}>> = (props) => {
  return (
    <svg
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19.7359 13.6852L18.1915 12.3648C18.2646 11.9168 18.3023 11.4594 18.3023 11.0019C18.3023 10.5445 18.2646 10.087 18.1915 9.63903L19.7359 8.31859C19.8524 8.21886 19.9358 8.08604 19.9749 7.93778C20.0141 7.78952 20.0072 7.63284 19.9552 7.48859L19.934 7.42729C19.5088 6.23895 18.8721 5.13735 18.0547 4.1757L18.0123 4.12618C17.9131 4.00959 17.7809 3.92577 17.6332 3.88578C17.4854 3.8458 17.3291 3.85151 17.1846 3.90218L15.2676 4.58362C14.5602 4.00357 13.7703 3.54613 12.9168 3.22545L12.5466 1.22121C12.5186 1.0704 12.4455 0.931659 12.3368 0.823419C12.2282 0.715179 12.0891 0.642563 11.9382 0.615219L11.8746 0.603429C10.6461 0.381783 9.35393 0.381783 8.12544 0.603429L8.06178 0.615219C7.91086 0.642563 7.77184 0.715179 7.66318 0.823419C7.55452 0.931659 7.48136 1.0704 7.45343 1.22121L7.08088 3.23488C6.23412 3.55563 5.44557 4.01282 4.74653 4.58834L2.81538 3.90218C2.67099 3.85111 2.51448 3.84519 2.36665 3.8852C2.21882 3.92521 2.08666 4.00926 1.98774 4.12618L1.9453 4.1757C1.12886 5.13803 0.492285 6.23945 0.0660269 7.42729L0.0448055 7.48859C-0.0613015 7.78334 0.0259421 8.11345 0.264093 8.31859L1.8274 9.65318C1.75431 10.0965 1.71894 10.5492 1.71894 10.9996C1.71894 11.4523 1.75431 11.905 1.8274 12.3459L0.264093 13.6805C0.147601 13.7803 0.0642265 13.9131 0.0250554 14.0613C-0.0141157 14.2096 -0.00722707 14.3663 0.0448055 14.5105L0.0660269 14.5718C0.492813 15.7602 1.12474 16.8567 1.9453 17.8234L1.98774 17.8729C2.0869 17.9895 2.21907 18.0733 2.36681 18.1133C2.51455 18.1533 2.67095 18.1476 2.81538 18.0969L4.74653 17.4108C5.44919 17.9885 6.23438 18.4459 7.08088 18.7642L7.45343 20.7779C7.48136 20.9287 7.55452 21.0675 7.66318 21.1757C7.77184 21.2839 7.91086 21.3566 8.06178 21.3839L8.12544 21.3957C9.36521 21.6185 10.6348 21.6185 11.8746 21.3957L11.9382 21.3839C12.0891 21.3566 12.2282 21.2839 12.3368 21.1757C12.4455 21.0675 12.5186 20.9287 12.5466 20.7779L12.9168 18.7737C13.77 18.4538 14.5644 17.9949 15.2676 17.4155L17.1846 18.0969C17.329 18.148 17.4855 18.1539 17.6334 18.1139C17.7812 18.0739 17.9133 17.9899 18.0123 17.8729L18.0547 17.8234C18.8753 16.8543 19.5072 15.7602 19.934 14.5718L19.9552 14.5105C20.0613 14.2205 19.9741 13.8904 19.7359 13.6852ZM16.5173 9.91726C16.5763 10.2733 16.6069 10.6388 16.6069 11.0043C16.6069 11.3698 16.5763 11.7352 16.5173 12.0913L16.3617 13.0368L18.1231 14.5435C17.8561 15.1587 17.519 15.741 17.1186 16.279L14.9304 15.5032L14.19 16.1116C13.6265 16.5737 12.9993 16.9368 12.3202 17.1915L11.4218 17.5287L10.9998 19.8159C10.3338 19.8913 9.66147 19.8913 8.99552 19.8159L8.57345 17.524L7.68215 17.1821C7.01014 16.9274 6.38529 16.5643 5.82646 16.1045L5.08607 15.4938L2.88376 16.2766C2.48291 15.7366 2.14808 15.1542 1.87928 14.5412L3.65952 13.0203L3.50625 12.0771C3.44966 11.7258 3.41901 11.3627 3.41901 11.0043C3.41901 10.6435 3.4473 10.2827 3.50625 9.93141L3.65952 8.98824L1.87928 7.46737C2.14572 6.85195 2.48291 6.2719 2.88376 5.73193L5.08607 6.51477L5.82646 5.90406C6.38529 5.44427 7.01014 5.08114 7.68215 4.82649L8.57581 4.4893L8.99788 2.19739C9.66046 2.12194 10.3372 2.12194 11.0021 2.19739L11.4242 4.48459L12.3226 4.82177C12.9993 5.07643 13.6289 5.43955 14.1924 5.90171L14.9328 6.51005L17.121 5.73429C17.5218 6.27426 17.8566 6.85667 18.1254 7.46973L16.3641 8.97645L16.5173 9.91726ZM10.0024 6.61852C7.71045 6.61852 5.8524 8.47657 5.8524 10.7685C5.8524 13.0604 7.71045 14.9184 10.0024 14.9184C12.2943 14.9184 14.1523 13.0604 14.1523 10.7685C14.1523 8.47657 12.2943 6.61852 10.0024 6.61852ZM11.8698 12.636C11.6249 12.8816 11.3338 13.0764 11.0133 13.2091C10.6928 13.3419 10.3492 13.4099 10.0024 13.4094C9.29734 13.4094 8.63476 13.1335 8.13488 12.636C7.88923 12.391 7.69445 12.0999 7.56172 11.7794C7.42899 11.4589 7.36093 11.1154 7.36147 10.7685C7.36147 10.0635 7.63735 9.40088 8.13488 8.901C8.63476 8.40111 9.29734 8.12759 10.0024 8.12759C10.7074 8.12759 11.37 8.40111 11.8698 8.901C12.1155 9.14593 12.3103 9.43702 12.443 9.75752C12.5757 10.078 12.6438 10.4216 12.6432 10.7685C12.6432 11.4735 12.3674 12.1361 11.8698 12.636Z"
        fill="currentColor"
      />
    </svg>
  );
};
