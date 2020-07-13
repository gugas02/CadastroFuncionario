using System;
using System.Collections.Generic;
using System.Text;

namespace Teste.Domain.Shared.Page
{
    public class PaginationBase
    {
        public int PageIndex { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string SortType { get; set; } = "asc";
        public string Search { get; set; }
        public int ItemFrom
        {
            get
            {
                return (PageIndex - 1) * PageSize;
            }
        }
    }
}
