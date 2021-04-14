
import pandas as pd
df0 = pd.ExcelFile("schools_1.xlsx").parse("Sheet1")
df1 = pd.ExcelFile("schools_2.xlsx").parse("Sheet1")
print df0
# df0 = df0.set_index("ID")
# df1 = df1.set_index("ID")
# 	