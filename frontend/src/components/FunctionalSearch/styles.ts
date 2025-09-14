import styled from "styled-components";

export const SearchContainer = styled.div`
  width: 100%;
  flex: 1;
  padding: 0 20px;
  display: flex;
  justify-content: end;
  align-items: center;

  .icon-search-properties {
    font-size: 25px;
    color: gray;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: ${({theme}) => theme.colors.primary};
    }
  }

  @media screen and (min-width: 1000px) {
    display: none;
  }
`;

export const BarTopSearch = styled.div`
  width: 100%;
  background-color: #f9f9f9;
  border-bottom: 1px solid #b1b3b0;
  height: 53px;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    margin-bottom: 0;
    font-size: 16px;
    font-family: "Nunito Sans", sans-serif;
    font-weight: 700;
    color: #63666a;
  }

  .button-close-modal-mobile {
    position: absolute;
    right: 5%;
    font-size: 20px;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: ${({theme}) => theme.colors.primary};
    }
  }
`;

export const SearchContent = styled.div`
  width: 100%;
  height: 100vh;
  background: #fff;
  padding: 1rem;

  .search-name-wrapper {
    margin-bottom: 20px;

    input {
      width: 100%;
      border: 1px solid #c9c9c9;
      padding: 10px 12px;
      font-size: 15px;
      border-radius: 4px;
      color: #333;

      &:focus {
        outline: none;
        border-color: ${({theme}) => theme.colors.primary};
      }

      &:disabled {
        background-color: #f5f5f5;
        color: #999;
      }
    }
  }

  .selectWrapper {
    position: relative;
  }

  select {
    width: 100%;
    border: 1px solid #c9c9c9;
    margin-bottom: 20px;
    position: relative;
    color: gray;
    padding: 7px 30px 7px 12px;
    font-size: 15px;
    border-radius: 4px;

    &:focus {
      outline: none;
      border-color: ${({theme}) => theme.colors.primary};
    }

    &:disabled {
      background-color: #f5f5f5;
      color: #999;
    }
  }

  option {
    border-radius: 0;
    color: gray;
  }

  option:disabled {
    color: #c6c6c6;
  }

  .custom-dropdown {
    border: 1px solid #c9c9c9;
    position: relative;
    color: gray;
    padding: 2px 18px 2px 8px;
    margin-left: 8px;
    font-size: 12px;
    width: 45%;
    display: flex;
    align-items: center;
    height: 38px;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      border-color: ${({theme}) => theme.colors.primary};
    }
  }

  .custom-dropdown-selection {
    background-color: #fff;
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .arrow-type {
    font-size: 14px;
    font-weight: 700;
    margin-left: auto;
  }

  .icon-clean-type {
    margin-left: 5px;
    cursor: pointer;
    color: #999;

    &:hover {
      color: #ff4444;
    }
  }

  .custom-dropdown .items-holder {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #fff;
    width: 100%;
    border: 1px solid gray;
    z-index: 1000;
    max-height: 180px;
    border-radius: 5px;
    padding: 5px 0;
    overflow-y: auto;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .custom-dropdown .items-holder .dropdown-item {
    padding: 10px 16px;
    cursor: pointer;
    color: gray;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #f5f5f5;
      color: ${({theme}) => theme.colors.primary};
    }
  }

  .type-goal-wrapper {
    width: 100%;
    border-bottom: 1px solid #b1b3b0;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 20px;
  }

  .select-half {
    width: 45% !important;
    margin-left: 8px;
  }
`;

export const SearchButtonContainer = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  gap: 10px;
  justify-content: space-between;

  button {
    font-size: 1.1rem;
    padding: 0.29813rem 1.175rem;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
    flex: 1;
  }

  .search-button-send {
    color: #fff;
    background: ${({theme}) => theme.colors.primary};
    border: 1px solid ${({theme}) => theme.colors.primary};

    &:hover {
      background: ${({theme}) => theme.colors.primaryDark || theme.colors.primary};
    }

    &:disabled {
      background: #ccc;
      border-color: #ccc;
      cursor: not-allowed;
    }
  }

  .reset-button {
    background: transparent;
    border: 1px solid ${({theme}) => theme.colors.primary};
    color: ${({theme}) => theme.colors.primary};

    &:hover {
      background: ${({theme}) => theme.colors.primary};
      color: #fff;
    }
  }
`;

export const SearchCodeWrapper = styled.div`
  width: 100%;
  border: 1px solid ${({theme}) => theme.colors.primary};
  border-radius: 20px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;

  input {
    flex: 1;
    border: none;
    padding: 5px;
    background: #f9f9f9;
    border-radius: 15px;

    &:focus {
      outline: none;
      background: #fff;
    }
  }

  button {
    background: ${({theme}) => theme.colors.primary};
    border: 1px solid transparent;
    color: #fff;
    padding: 3px 12px;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background: ${({theme}) => theme.colors.primaryDark || theme.colors.primary};
    }
  }
`;