f = File.new('puzzle_6.txt').readlines.map do |line| 
  line.gsub("\n", '')
  line.gsub(/[Time:|Distance:|]/, '')
end

time, distance = f.map! { |line| line.gsub(' ', '').to_i }

total = 0
no_way = 0
button_time = 0
loop do
  unless button_time * (time - button_time) >= distance
    no_way += 10
  else
    break
  end

  button_time += 10
end

no_way -= 10
button_time -= 10
loop do
  unless button_time * (time - button_time) >= distance
    no_way += 1
  else
    break
  end

  button_time += 1
end

p(time + 1 - no_way*2)

# f = File.new('puzzle_6.txt').readlines.map do |line| 
#   line.gsub("\n", '')
#   line.gsub(/[Time:|Distance:|]/, '')
# end

# all_times, all_distances = f.map! { |line| line.split(' ').map(&:to_i) }

# race_idx = 0
# all_ways = []
# while race_idx < all_times.size
#   time = all_times[race_idx]
#   distance = all_distances[race_idx]

#   possible_ways = 0
#   if time > distance
#     possible_ways += (time + 1)
#   else
#     1.upto(time) do |button_time|
#       possible_ways += 1 if button_time * (time - button_time) > distance
#     end
#   end

#   all_ways << possible_ways
#   race_idx += 1
# end

# p all_ways.inject(1) { |prod, num| prod * num }