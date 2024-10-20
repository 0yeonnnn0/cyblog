import React, { createContext, useContext, ReactNode } from "react";

const SelectDateContext = createContext<Date | undefined>(undefined);

export const useSelectDate = () => useContext(SelectDateContext);

export const SelectDateProvider = ({
  children,
  selectDate,
}: {
  children: ReactNode;
  selectDate: Date;
}) => (
  <SelectDateContext.Provider value={selectDate}>
    {children}
  </SelectDateContext.Provider>
);
