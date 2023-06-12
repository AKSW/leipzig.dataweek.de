# Returns a datastructure representing the program

# iterate over session_rows
#   capture last_start
#   if current start different to last_start
#



module Jekyll
  module ProgramTable
    def program_table(input)
      if input.nil?
        return Array.new()
      end
      times = []
      events_table = []
      row = []
      orders = []
      order_hash = {}
      for session_row in input do
        order = session_row.key?("order") ? session_row["order"].literal : nil
        if order.to_i > 0 then
          orders.push(order.to_i)
        end
      end
      orders.uniq!.sort!
      i = 0
      for order in orders do
        i += 1
        order_hash[order] = i
      end
      for session_row in input do
        start_time = session_row["start"].literal
        end_time = session_row["end"].literal
        order = session_row.key?("order") ? session_row["order"].literal : nil
        if order then
          order = order_hash[order.to_i]
        end

        if times.length == 0 or times[-1] != start_time then
          if times.length > 0 then
            # row_break
            # Add last row to events_table
            events_table = Array(events_table).push(row)
            row = Array.new()
          end
          times = Array(times).push(start_time)
        end

        session_hash = { "resource" => session_row["session"], "column" => order, "start" => start_time, "end" => end_time }
        row = Array(row).push(session_hash)
      end
      # Add last row to events_table
      events_table = Array(events_table).push(row)

      rowspans = []
      for order in orders do
        rowspans[order] = 0
      end

      for events_row in events_table do
        unless events_row[0]["column"] then
          # skip breaks
          next
        end
        for order in orders do
          rowspans[order] = [rowspans[order] - 1, 0].max
        end
        for event in events_row do
          start_index = times.find_index(event["start"])
          end_index = start_index + 1
          for end_time in times.drop(start_index) do
            if event["end"] <= end_time then
              end_index = times.find_index(end_time)
              break
            end
          end
          rowspan = end_index - start_index
          rowspans[event["column"]] = rowspan
          event["column_shift"] = event["column"] - rowspans[..event["column"] - 1].rindex { |x| x != 0 } - 1
          event["rowspan"] = rowspan
        end
      end
      return events_table
    end
  end
end

Liquid::Template.register_filter(Jekyll::ProgramTable)
