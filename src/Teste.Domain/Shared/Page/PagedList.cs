using System;
using System.Collections.Generic;
using System.Text;

namespace Teste.Domain.Shared.Page
{
    public class PagedList<T>
    {
        public PagedList()
        {

        }

        public PagedList(IEnumerable<T> data, long count, long pageSize)
        {
            Data = data;
            Count = count;
            PageSize = pageSize;
        }

        public IEnumerable<T> Data { get; set; }

        public long TotalPages { get; set; }

        public long Count { get; set; }
        public long PageSize { get; set; }
    }
}
