import colors from 'tailwindcss/colors';

export const TableDesign = {
  table:{
    style: {
      paddingBottom: "10px",
      borderRadius: "13px"
    }
  },
  headCells: {
    style:{
      backgroundColor: colors.slate[200],
      fontWeight: "bold",
      fontSize: "12px",
      color: colors.slate[600],
      overflow: "visible",
      "&:first-child": {
        paddingRight: "50px",
      }
    },
  },
  rows:{
    style:{
      fontSize: "13px",
      textAlign: "right",
      overflow: "visible",
      paddingRight: "30px",
      "&:hover": {
        backgroundColor: colors.gray[50]
      },
      "&:nth-child(even)": {
        backgroundColor: colors.gray[50]
      }
    },
    denseStyle: {
			minHeight: '100px',
		},
  },
  cells: {
    style: {
      overflow: "visible"
    }
  }
}



export const theme = {
  fontFamily: 'Iran-sans',
  headings: {fontFamily: 'Iran-sans'},
  other:{
    letterSpacing: "3px",
  }
}