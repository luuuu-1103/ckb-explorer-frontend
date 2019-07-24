import React, { useContext } from 'react'
import styled from 'styled-components'
import CopyIcon from '../../assets/copy.png'
import AppContext from '../../contexts/App'
import i18n from '../../utils/i18n'
import { isSmallMobile, isMediumMobile, isLargeMobile } from '../../utils/screen'
import { startEndEllipsis } from '../../utils/string'
import { copyElementValue } from '../../utils/util'

const AddressHashCardPanel = styled.div`
  width: 100%;
  border-radius: 6px;
  box-shadow: 2px 2px 6px 0 #dfdfdf;
  background-color: #ffffff;
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: 700px) {
    height: 50px;
    border-radius: 3px;
    box-shadow: 1px 1px 3px 0 #dfdfdf;
  }

  .address_hash__title {
    margin-left: 40px;
    font-size: 30px;
    font-weight: 500;
    color: #000000;

    @media (max-width: 700px) {
      font-size: 15px;
      margin-left: 20px;
    }
  }

  #address_hash__hash {
    margin-left: 20px;
    font-size: 20px;
    color: #000000;
    transform: translateY(3px);

    @media (max-width: 700px) {
      font-size: 13px;
      margin-left: 10px;
      font-weight: 500;
      transform: translateY(1px);
    }
  }

  .address_hash__copy_iocn {
    cursor: pointer;
    margin-left: 20px;
    transform: translateY(6px);

    @media (max-width: 700px) {
      margin-left: 10px;
      transform: translateY(3px);
    }

    > img {
      width: 21px;
      height: 24px;

      @media (max-width: 700px) {
        width: 16px;
        height: 18px;
      }
    }
  }
`

const handleHashText = (hash: string) => {
  if (isSmallMobile()) {
    return startEndEllipsis(hash, 8, 10)
  }
  if (isMediumMobile()) {
    return startEndEllipsis(hash, 9)
  }
  if (isLargeMobile()) {
    return startEndEllipsis(hash, 14)
  }
  return hash
}

export default ({ title, hash }: { title: string; hash: string }) => {
  const appContext = useContext(AppContext)
  return (
    <AddressHashCardPanel>
      <div className="address_hash__title">{title}</div>
      <div id="address_hash__hash">
        <code>{handleHashText(hash)}</code>
      </div>
      <div
        className="address_hash__copy_iocn"
        role="button"
        tabIndex={-1}
        onKeyDown={() => {}}
        onClick={() => {
          copyElementValue(document.getElementById('address_hash__hash'))
          appContext.toastMessage(i18n.t('common.copied'), 3000)
        }}
      >
        <img src={CopyIcon} alt="copy" />
      </div>
    </AddressHashCardPanel>
  )
}