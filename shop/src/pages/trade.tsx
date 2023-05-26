import { useState, useRef } from 'react';
import type { NextPageWithLayout } from '@/types';
import Layout from '@/layouts/_layout';
import TradeTitle from '@/components/trade/trade-title';
import TradePaths from '@/components/trade/trade-paths';
import TradeSubtitle from '@/components/trade/trade-subtitle';
import TradeSelect from '@/components/trade/trade-select';
import TradeSearchButton from '@/components/trade/trade-search-button';
import TradeProduct from '@/components/trade/trade-product';
import TradeBackdrop from '@/components/trade/trade-backdrop';
import ConfirmTradeModal from '@/components/trade/confirm-trade-modal';
import SuccessTradeModal from '@/components/trade/success-trade-modal';
import { ProductProps } from '@/components/trade/trade-product';

import productImage from '@/assets/images/trending-product.png';
import publisherLogo from '@/assets/images/publisher-logo.png';
import omnicoTeamLogo from '@/assets/images/omnico-team.png';

const Trade: NextPageWithLayout = () => {
  const [tradeProduct, setTradeProduct] = useState<ProductProps | null>(null);
  const isProductSelected = !!tradeProduct;
  const [isConfirmedTrade, setIsConfirmedTrade] = useState(false);
  const containerRef = useRef(null);

  const productToTrade = {
    product_image: productImage,
    product_name: 'ChawkBazar Laravel Flutter Mobile App',
    publisher: 'Omnico Team',
    publisher_logo: omnicoTeamLogo,
  }

  const tradeProducts = new Array(12).fill({
    product_name: 'Dashify WordPress Elementor ...',
    product_image: productImage,
    publisher: 'Betasoft',
    publisher_logo: publisherLogo,
  });

  const tradePaths = [
    { path: 'Product' },
    { path: 'Product-item' },
    { path: 'Trade', active: true },
  ];

  function closeConfirmTradeModal() {
    setTradeProduct(null);
  }

  function confirmTrade() {
    setIsConfirmedTrade(true);
  }

  function backToHome() {
    setTradeProduct(null);
    setIsConfirmedTrade(false);
  }

  return (
    <>
      {/* <Seo
        title=''
        description=''
        url={}
      /> */}
      <div className='relative' ref={containerRef}>
        <div className='px-[18px] md:px-[32px] lg:px-[48px] 2xl:px-[62px] 3xl:px-[72px]'>
          <section className='px-[14px] md:px-[20px] 2xl:px-[26px]'>
            <div className='pt-[32px] lg:pt-[42px] 2xl:pt-[54px]'>
              <TradeTitle title='Trade Item' />
              <TradePaths paths={tradePaths} />
            </div>
            <div className='mt-[32px] lg:mt-[38px] 2xl:mt-[44px] flex gap-x-[24px] flex-wrap justify-between'>
              <TradeSubtitle subtitle='Select your Trade Item From Below' />
              <div className='flex flex-wrap items-center gap-[24px] lg:gap-[27px] 2xl:gap-[30px] ml-auto'>
                <TradeSelect />
                <TradeSearchButton />
              </div>
            </div>
          </section>
          <section className='mt-[32px] lg:mt-[48px] 2xl:mt-[60px] pb-[24px] grid gap-x-[22px] xl:gap-x-[28px] 2xl:gap-x-[44px] gap-y-[22px] grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5'>
            {tradeProducts.map((product, index) => (
              <TradeProduct
                key={index}
                product={product}
                setTradeProduct={(product) => setTradeProduct(product)}
              />
            ))}
          </section>
        </div>

        <TradeBackdrop
          isModalActive={isProductSelected || isConfirmedTrade}
          containerRef={containerRef}
        >
          { isConfirmedTrade ? (
            <SuccessTradeModal
              productToTrade={productToTrade}
              tradeProduct={tradeProduct}
              backToHome={backToHome}
            />
          ) : isProductSelected ? (
            <ConfirmTradeModal
              productToTrade={productToTrade}
              tradeProduct={tradeProduct}
              confirmTrade={confirmTrade}
              closeModal={closeConfirmTradeModal}
            />
          ) : (
            <></>
          )}
        </TradeBackdrop>
      </div>
    </>
  );
};

Trade.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Trade;