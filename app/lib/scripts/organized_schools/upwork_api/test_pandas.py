import pandas as pd
df0 = pd.ExcelFile("s_3.xlsx").parse("Sheet1")
df1 = pd.ExcelFile("s_2.xlsx").parse("Sheet1")

a0, a1 = df0.align(df1)
different = (a0 != a1).any(axis = 1)
comp = a0[different].join(a1[different], lsuffix='_old', rsuffix='_new')
comp.to_excel("comparisons1.xlsx")