import { createContext } from 'react';

// The extra prop which can be accessed by wrapping a component with `withScreenSize`
export type ScreenSizeProp = {
  screenSize: ScreenSizeProps
}

export type ScreenSizeProps = {
  screenWidth: number;
  screenHeight: number;
  statusBarHeight: number;
};

const ScreenSizeContext = createContext<ScreenSizeProps>({
  screenWidth: 1792,
  screenHeight: 828,
  statusBarHeight: 0,
});

export const ScreenSizeProvider = ScreenSizeContext.Provider;

export const ScreenSizeConsumer = ScreenSizeContext.Consumer;

export const withScreenSize = (Component) => (props) =>
  (
    <ScreenSizeConsumer>
      {(state) => {
        return <Component{...props} screenSize={state}
        />;
      }}
    </ScreenSizeConsumer>
  );
