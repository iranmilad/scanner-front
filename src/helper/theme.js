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
      padding: 0,
      color: colors.slate[600],
      "&:first-child": {
        paddingRight: "10px",
      }
    },
  },
  rows:{
    style:{
      fontSize: "13px",
      textAlign: "right",
      paddingRight: "10px",
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
      padding: 0
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